export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    // debugger;
    const horCushion = options.horCushion || options.cushion;
    const verCushion = options.verCushion || options.cushion;
    
    const top = triggerBoundingBox.bottom + verCushion - parentBoundingBox.top,
        left = triggerBoundingBox.left + horCushion - parentBoundingBox.left;

    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
    };
};
