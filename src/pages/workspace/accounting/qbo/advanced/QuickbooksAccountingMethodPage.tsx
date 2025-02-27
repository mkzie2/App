import {CONST as COMMON_CONST} from 'expensify-common';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import RadioListItem from '@components/SelectionList/RadioListItem';
import type {ListItem} from '@components/SelectionList/types';
import SelectionScreen from '@components/SelectionScreen';
import type {SelectorType} from '@components/SelectionScreen';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {settingsPendingAction} from '@libs/PolicyUtils';
import Navigation from '@navigation/Navigation';
import type {WithPolicyConnectionsProps} from '@pages/workspace/withPolicyConnections';
import withPolicyConnections from '@pages/workspace/withPolicyConnections';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';

type MenuListItem = ListItem & {
    value: ValueOf<typeof COMMON_CONST.INTEGRATIONS.ACCOUNTING_METHOD>;
};

function QuickbooksAccountingMethodPage({policy}: WithPolicyConnectionsProps) {
    const {translate} = useLocalize();
    const policyID = policy?.id ?? '-1';
    const styles = useThemeStyles();
    const config = policy?.connections?.quickbooksOnline?.config;
    const autoSyncConfig = policy?.connections?.quickbooksOnline?.config;
    const accountingMethod = config?.accountingMethod ?? COMMON_CONST.INTEGRATIONS.ACCOUNTING_METHOD.CASH;
    const data: MenuListItem[] = Object.values(COMMON_CONST.INTEGRATIONS.ACCOUNTING_METHOD).map((accountingMethodType) => ({
        value: accountingMethodType,
        text: translate(`workspace.netsuite.advancedConfig.accountingMethods.values.${accountingMethodType}` as TranslationPaths),
        alternateText: translate(`workspace.netsuite.advancedConfig.accountingMethods.alternateText.${accountingMethodType}` as TranslationPaths),
        keyForList: accountingMethodType,
        isSelected: accountingMethod === accountingMethodType,
    }));

    const pendingAction =
        settingsPendingAction([CONST.QUICKBOOKS_CONFIG.AUTO_SYNC], autoSyncConfig?.pendingFields) ?? settingsPendingAction([CONST.QUICKBOOKS_CONFIG.ACCOUNTING_METHOD], config?.pendingFields);

    const headerContent = useMemo(
        () => (
            <View>
                <Text style={[styles.ph5, styles.pb5]}>{translate('workspace.netsuite.advancedConfig.accountingMethods.description')}</Text>
            </View>
        ),
        [translate, styles.pb5, styles.ph5],
    );

    const selectExpenseReportApprovalLevel = useCallback(
        (row: MenuListItem) => {
            if (row.value !== accountingMethod) {
                // Call update API here.
            }
            Navigation.goBack(ROUTES.POLICY_ACCOUNTING_QBO_AUTO_SYNC.getRoute(policyID));
        },
        [accountingMethod, policyID],
    );

    console.log("3232323");
    return (
        <SelectionScreen
            displayName={QuickbooksAccountingMethodPage.displayName}
            title="workspace.netsuite.advancedConfig.accountingMethods.label"
            headerContent={headerContent}
            sections={[{data}]}
            listItem={RadioListItem}
            onSelectRow={(selection: SelectorType) => selectExpenseReportApprovalLevel(selection as MenuListItem)}
            initiallyFocusedOptionKey={data.find((mode) => mode.isSelected)?.keyForList}
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
            onBackButtonPress={() => Navigation.goBack(ROUTES.POLICY_ACCOUNTING_QBO_AUTO_SYNC.getRoute(policyID))}
            connectionName={CONST.POLICY.CONNECTIONS.NAME.QBO}
            pendingAction={pendingAction}
        />
    );
}

QuickbooksAccountingMethodPage.displayName = 'QuickbooksAccountingMethodPage';

export default withPolicyConnections(QuickbooksAccountingMethodPage);