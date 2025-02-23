import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return <>
  <Navbar />
  <main>
    {children}
  </main>
    <Footer />
  </>
}

export default MainLayout
