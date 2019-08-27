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
        left =
            triggerBoundingBox.left -
            horCushion -
            contentBoundingBox.width +
            triggerBoundingBox.width -
            parentBoundingBox.left;

    return {
        position: 'absolute',
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
    };
};
