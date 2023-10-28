// import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setupInterceptors from "../helpers/setUpInterceptor"
import NextNProgress from 'nextjs-progressbar';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextNProgress color={'#365c2a'} />
        <ToastContainer />

        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
}

export default MyApp

setupInterceptors(store);