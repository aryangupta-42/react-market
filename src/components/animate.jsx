import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Animate = (props) => {
    const { delay, index, children } = props;
    const netDelay = delay * index;

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                ease: 'easeOut',
                duration: 0.2,
                delay: netDelay,
            }}
            style={{
                width: 'auto',
            }}
        >
            {children}
        </motion.div>
    );
};

Animate.propTypes = {
    delay: PropTypes.number,
    index: PropTypes.number,
    children: PropTypes.element.isRequired,
};

Animate.defaultProps = {
    delay: 0.1,
    index: 0,
};

export default Animate;
