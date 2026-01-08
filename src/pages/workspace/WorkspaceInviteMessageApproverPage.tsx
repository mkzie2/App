import React, {useMemo} from 'react';
import type {SelectionListApprover} from '@components/ApproverSelectionList';
import ApproverSelectionList from '@components/ApproverSelectionList';
import {usePersonalDetails} from '@components/OnyxListItemProvider';
import ScreenWrapper from '@components/ScreenWrapper';
import {useMemoizedLazyExpensifyIcons} from '@hooks/useLazyAsset';
import useLocalize from '@hooks/useLocalize';
import useOnyx from '@hooks/useOnyx';
import useViewportOffsetTop from '@hooks/useViewportOffsetTop';
import {setWorkspaceInviteApproverDraft} from '@libs/actions/Policy/Member';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {SettingsNavigatorParamList} from '@libs/Navigation/types';
import {getDefaultApprover, getMemberAccountIDsForWorkspace, goBackFromInvalidPolicy} from '@libs/PolicyUtils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import AccessOrNotFoundWrapper from './AccessOrNotFoundWrapper';
import MemberRightIcon from './MemberRightIcon';
import withPolicyAndFullscreenLoading from './withPolicyAndFullscreenLoading';
import type {WithPolicyAndFullscreenLoadingProps} from './withPolicyAndFullscreenLoading';

type WorkspaceInviteMessageRolePageProps = WithPolicyAndFullscreenLoadingProps & PlatformStackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.INVITE_MESSAGE_APPROVER>;

function WorkspaceInviteMessageRolePage({policy, route}: WorkspaceInviteMessageRolePageProps) {
    const defaultApprover = useMemo(() => getDefaultApprover(policy), [policy]);
    const [approver = defaultApprover] = useOnyx(`${ONYXKEYS.COLLECTION.WORKSPACE_INVITE_APPROVER_DRAFT}${route.params.policyID}`, {
        canBeMissing: true,
    });
    const viewportOffsetTop = useViewportOffsetTop();
    const personalDetails = usePersonalDetails();
    const icons = useMemoizedLazyExpensifyIcons(['FallbackAvatar']);
    const [isLoadingReportData = true] = useOnyx(ONYXKEYS.IS_LOADING_REPORT_DATA, {canBeMissing: false});

    const {translate} = useLocalize();

    const allApprovers: SelectionListApprover[] = useMemo(() => {
        if (!policy?.employeeList) {
            return [];
        }

        return Object.values(policy.employeeList)
            .map((employee): SelectionListApprover | null => {
                const email = employee.email;

                if (!email) {
                    return null;
                }

                const policyMemberEmailsToAccountIDs = getMemberAccountIDsForWorkspace(policy.employeeList);
                const accountID = Number(policyMemberEmailsToAccountIDs[email] ?? '');

                if (!accountID) {
                    return null;
                }

                const {avatar, displayName = email, login} = personalDetails?.[accountID] ?? {};

                return {
                    text: displayName,
                    alternateText: email,
                    keyForList: email,
                    isSelected: approver === email,
                    login: email,
                    icons: [{source: avatar ?? icons.FallbackAvatar, type: CONST.ICON_TYPE_AVATAR, name: displayName, id: accountID}],
                    rightElement: (
                        <MemberRightIcon
                            role={employee.role}
                            owner={policy?.owner}
                            login={login}
                        />
                    ),
                };
            })
            .filter((a): a is SelectionListApprover => !!a);
    }, [policy?.employeeList, policy?.owner, personalDetails, approver, icons.FallbackAvatar]);

    return (
        <AccessOrNotFoundWrapper
            policyID={route.params.policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            fullPageNotFoundViewProps={{subtitleKey: isEmptyObject(policy) ? undefined : 'workspace.common.notAuthorized', onLinkPress: goBackFromInvalidPolicy}}
        >
            <ScreenWrapper
                testID="WorkspaceInviteMessageRolePage"
                enableEdgeToEdgeBottomSafeAreaPadding
                shouldEnableMaxHeight
                style={{marginTop: viewportOffsetTop}}
            >
                <ApproverSelectionList
                    testID="WorkspaceInviteMessageRolePage"
                    headerTitle={translate('workflowsPage.approver')}
                    isLoadingReportData={isLoadingReportData}
                    policy={policy}
                    initiallyFocusedOptionKey={approver}
                    shouldShowNotFoundViewLink
                    allApprovers={allApprovers}
                    onBackButtonPress={Navigation.goBack}
                    shouldShowListEmptyContent={false}
                    listEmptyContentSubtitle={translate('workflowsPage.emptyContent.approverSubtitle')}
                    allowMultipleSelection={false}
                    onSelectApprover={(selectedApprovers) => {
                        const selectedApprover = selectedApprovers?.at(0);
                        const selectedApproverEmail = selectedApprover ? selectedApprover.login : null;
                        if (!selectedApproverEmail) {
                            return;
                        }
                        setWorkspaceInviteApproverDraft(route.params.policyID, selectedApproverEmail ?? '');
                        Navigation.goBack(route.params.backTo);
                    }}
                />
            </ScreenWrapper>
        </AccessOrNotFoundWrapper>
    );
}

export default withPolicyAndFullscreenLoading(WorkspaceInviteMessageRolePage);
