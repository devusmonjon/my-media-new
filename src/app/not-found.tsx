import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
