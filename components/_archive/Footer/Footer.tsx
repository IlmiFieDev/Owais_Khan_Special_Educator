import Image from "next/image";
import Link from "next/link";
import { SITE_CONTENT } from "@/lib/content";

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link href="/#home" className="footer-brand" aria-label="Owais Alam Khan — home"><Image src="/brand/ok-mark-white.svg" width={50} height={40} alt="" /><span className="footer-divider" aria-hidden="true" /><div><b>{SITE_CONTENT.personal.name}</b><span>Special Educator · Delhi NCR</span></div></Link><nav aria-label="Footer navigation"><Link href="/#about">About</Link><Link href="/#expertise">Expertise</Link><Link href="/#experience">Experience</Link><Link href="/#approach">Approach</Link><Link href="/#contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><p>{SITE_CONTENT.footer.copyright}</p></div></footer>;
}
