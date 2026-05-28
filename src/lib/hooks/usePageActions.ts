'use client'

interface PageActionHandlers {
  onReset: () => void
  onRefresh: () => void
}

export const usePageActions = (handlers: PageActionHandlers) => {
  const { onReset, onRefresh } = handlers

  const resetPage = () => {
    onReset()
  }

  const refreshPage = () => {
    onRefresh()
  }

  return {
    resetPage,
    refreshPage
  }
}
