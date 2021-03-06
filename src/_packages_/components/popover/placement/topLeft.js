export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    const horCushion = options.horCushion || options.cushion;
    const verCushion = options.verCushion || options.cushion;

    const top =
            triggerBoundingBox.top -
            contentBoundingBox.height -
            verCushion -
            parentBoundingBox.top,
        left = triggerBoundingBox.left + horCushion - parentBoundingBox.left;
    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
    };
};
