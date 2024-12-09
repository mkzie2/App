import type {NavigationAction} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import ConfirmModal from '@components/ConfirmModal';

type DiscardChangesModalProps = {
    hasUnsavedChanges: boolean;
};
function DiscardChangesModal({hasUnsavedChanges}: DiscardChangesModalProps) {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const preventedNavigationAction = useRef<NavigationAction>();

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                return;
            }

            e.preventDefault();
            preventedNavigationAction.current = e.data.action;
            setIsVisible(true);
        });
    }, [hasUnsavedChanges]);

    return (
        <ConfirmModal
            isVisible={isVisible}
            title="Discard changes?"
            prompt="Are you sure?"
            danger
            confirmText="Discard changes"
            cancelText="Cancel"
            onConfirm={() => {
                setIsVisible(false);
                if (preventedNavigationAction.current) {
                    navigation.dispatch(preventedNavigationAction.current);
                }
            }}
            onCancel={() => setIsVisible(false)}
        />
    );
}

DiscardChangesModal.displayName = 'DiscardChangesModal';

export default DiscardChangesModal;
