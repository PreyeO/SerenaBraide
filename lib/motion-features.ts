// Loaded on demand by <LazyMotion> in app/provider.tsx, so framer-motion's
// animation engine arrives after the page instead of blocking it.
// domAnimation covers everything the site uses: animate/exit, AnimatePresence,
// whileInView, hover/tap. (Drag and layout animations would need domMax.)
import { domAnimation } from "framer-motion";

export default domAnimation;
