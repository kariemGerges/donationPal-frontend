import React from 'react';
import { motion, useInView } from 'framer-motion';
import Theme from '../../ThemeContext/ThemeContext';


const AnimatedCard = ({ children, delay }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    const { theme } = React.useContext(Theme);

    return (
        <motion.div
            ref={ref}
            className={`bg-white bg-opacity-10 rounded-lg  ${theme? 'shadow-[0_4px_14px_0_rgba(255,255,100,0.5)] ' : 'backdrop-blur-md shadow-lg'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
};


export default AnimatedCard;