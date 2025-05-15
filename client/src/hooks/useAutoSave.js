import { useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import { toast } from 'react-toastify'

const useAutoSave = (blogData, saveDraftCallback) => {
  const hasContent = blogData.title || blogData.content

  // Reference to track if initial content is loaded
  const initialLoadRef = useRef(true)
  
  // Create debounced save function - saves after 5 seconds of inactivity
  const debouncedSave = useRef(
    debounce(async (data) => {
      if (data.title || data.content) {
        await saveDraftCallback(data)
        toast.info('Auto-saved')
      }
    }, 5000)
  ).current

  // Auto-save every 30 seconds if there's content
  useEffect(() => {
    let interval

    if (hasContent && !initialLoadRef.current) {
      interval = setInterval(async () => {
        await saveDraftCallback(blogData)
        toast.info('Auto-saved')
      }, 30000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [blogData, hasContent, saveDraftCallback])

  // Auto-save on content change (after 5s of inactivity)
  useEffect(() => {
    if (initialLoadRef.current) {
      // Skip saving on initial load
      initialLoadRef.current = false
      return
    }

    if (hasContent) {
      debouncedSave(blogData)
    }
    
    return () => {
      debouncedSave.cancel()
    }
  }, [blogData, hasContent, debouncedSave])
}

export default useAutoSave