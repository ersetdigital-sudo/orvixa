import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer variant="home" />
    </>
  );
}
