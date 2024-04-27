import { Home } from '@modules'
import { ApiProvider, QueryProvider } from '@providers'

function App() {
  return (
    <QueryProvider>
      <ApiProvider>
        <Home />
      </ApiProvider>
    </QueryProvider>
  )
}

export default App
