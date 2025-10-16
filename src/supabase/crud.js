import { supabase } from '@/supabase/supabase'
import { decode } from 'base64-arraybuffer'
import { v7 } from 'uuid'
import router from '@/router'

// html 내 base64 이미지들 배열로 반환
const findBase64ImagesFromHtml = (htmlString) => {
  const imgRegex = /<img[^>]+src="(data:image\/[^;]+;base64[^"]+)"[^>]*>/g
  const base64Images = [...htmlString.matchAll(imgRegex)].map((m) => m[1])

  return base64Images
}

// html 내 이미지 주소 배열로 추출
const findImageURLFromHTML = (htmlString) => {
  const imgRegex = /<img[^>]+src=["']?([^">]+)["']?[^>]*>/g
  const imageURLs = [...htmlString.matchAll(imgRegex)].map((m) => m[1])

  return imageURLs
}

// base64 이미지 서버로 저장
const uploadImage = async (base64String) => {
  const pureBase64 = base64String.split(',')[1]
  const imageType = base64String.match(/^data:image\/(\w+);base64,/)[1]
  const timestamp = Date.now()
  const fileName = `public/image_${timestamp}.${imageType}`

  try {
    const { data, error } = await supabase.storage
      .from('galleryArt')
      .upload(fileName, decode(pureBase64), {
        contentType: `image/${imageType}`,
      })

    if (error) throw error

    const { data: urlData } = await supabase.storage.from('galleryArt').getPublicUrl(data.path)

    return {
      success: true,
      path: urlData.publicUrl,
    }
  } catch (error) {
    console.error('Upload image failed:', error)
    return {
      success: false,
      error: error,
    }
  }
}

// bucket에서 이미지 삭제
const deleteImage = async (imageFullURLs) => {
  try {
    const imageUrls = imageFullURLs.map((url) => url.split('galleryArt/')[1])
    const { data, error } = await supabase.storage.from('galleryArt').remove(imageUrls)

    if (error) throw error
  } catch (error) {
    console.error('Delete image failed: ', error)
  }
}

// base64 업로드 후 supabase 경로로 변환
const replaceBase64WithUrls = async (htmlString) => {
  const base64Images = findBase64ImagesFromHtml(htmlString)
  //이미지 없을 시 탈출
  if (base64Images.length === 0) {
    return htmlString
  }

  let updatedHtml = htmlString

  for (let i = 0; i < base64Images.length; i++) {
    const base64Image = base64Images[i]
    const result = await uploadImage(base64Image)

    if (result.success) {
      updatedHtml = updatedHtml.replace(base64Image, result.path)
    } else {
      console.error('supabase url 교체 실패:', result.error)
    }
  }

  return updatedHtml
}

const savePostToSupabase = async (titleString, infoString, htmlString) => {
  try {
    const postuuid = v7()
    const { error } = await supabase
      .from('gallery')
      .insert({ title: titleString, info: infoString, uuid: postuuid, content: htmlString })

    if (error) throw error

    router.push({ name: 'home' })
  } catch (error) {
    console.error('게시물 저장 실패:', error)
  }
}

const updatePostToSupabase = async (
  postUuid,
  titleString,
  infoString,
  htmlString,
  deletedPaths,
) => {
  try {
    const { error } = await supabase
      .from('gallery')
      .update({ title: titleString, info: infoString, content: htmlString })
      .eq('uuid', postUuid)
    if (error) throw error

    deleteImage(deletedPaths)
    router.push({ name: 'home' })
  } catch (error) {
    console.error('게시물 수정 실패:', error)
  }
}

const deletePostFromSupabase = async (uuid) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('content')
      .eq('uuid', uuid)
      .single()

    if (error) throw error

    let imagePaths = findImageURLFromHTML(data.content)
    deleteImage(imagePaths)

    await supabase.from('gallery').delete().eq('uuid', uuid)
  } catch (error) {
    console.error('게시물 삭제 중 오류 발생: ', error)
  }
}

const fetchPostFromSupabase = async (uuid) => {
  const { data, error } = await supabase
    .from('gallery')
    .select('title, info, content')
    .eq('uuid', uuid)
    .single()

  return { data, error }
}

export default {
  findImageURLFromHTML,
  replaceBase64WithUrls,
  savePostToSupabase,
  updatePostToSupabase,
  deletePostFromSupabase,
  fetchPostFromSupabase,
}
