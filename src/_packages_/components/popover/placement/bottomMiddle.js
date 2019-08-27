// copy from bottomLeft.js
export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    // const horCushion = options.horCushion || options.cushion;
    const verCushion = options.verCushion || options.cushion;

    console.log('bottomMiddle');
    const top = triggerBoundingBox.bottom + verCushion - parentBoundingBox.top;
    const left =
        triggerBoundingBox.left -
        parentBoundingBox.left -
        (contentBoundingBox.width - triggerBoundingBox.width) / 2;

    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
    };
};
