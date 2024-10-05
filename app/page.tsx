import NavbarComponent from "@/components/Navbar";
import Teacher from "@/components/CardLayout";
import logo from "@/images/logo.png";

export default async function Home() {
  
  return (
    <main>
      <NavbarComponent />
      <div className="flex m-5 p-5 flex-wrap">
        <Teacher name={"Teacher A"} picture={logo} />
        <Teacher name={"Teacher B"} picture={logo} />
        <Teacher name={"Teacher C"} picture={logo} />
        <Teacher name={"Teacher D"} picture={logo} />
        <Teacher name={"Teacher E"} picture={logo} />
        <Teacher name={"Teacher F"} picture={logo} />
        <Teacher name={"Teacher G"} picture={logo} />
      </div>
    </main>
  );
}
