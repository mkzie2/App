type DiscardChangesConfirmationProps = {
    getHasUnsavedChanges?: () => boolean;
    onCancel?: () => void;
    hasUnsavedChanges: boolean;
};

export default DiscardChangesConfirmationProps;
