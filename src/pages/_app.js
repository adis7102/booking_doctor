import '@/styles/globals.scss';
import '@/styles/pages/Home.scss';
import '@/styles/pages/DoctorDetail.scss';
import '@/styles/components/Layout.scss';
import '@/styles/components/Navbar.scss';
import '@/styles/components/Footer.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
