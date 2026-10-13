import { watch, onBeforeUnmount } from 'vue'

// setzt den Tab-Titel, solange die aufrufende Komponente angezeigt wird
// title: Ref, computed oder Getter, wie die Quelle bei watch
export function useDocumentTitle(title) {
  watch(
    title,
    (value) => {
      document.title = value
    },
    { immediate: true },
  )

  // beim Verlassen der Seite zuruecksetzen, bevor die naechste startet
  onBeforeUnmount(() => {
    document.title = 'MovieFlow'
  })
}
