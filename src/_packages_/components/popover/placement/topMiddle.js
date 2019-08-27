export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    const verCushion = options.verCushion || options.cushion;

    const top =
        triggerBoundingBox.top -
        contentBoundingBox.height -
        verCushion -
        parentBoundingBox.top;
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
