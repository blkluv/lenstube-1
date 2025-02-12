import ChevronRightOutline from '@components/Common/Icons/ChevronRightOutline'
import SplitOutline from '@components/Common/Icons/SplitOutline'
import Tooltip from '@components/UIElements/Tooltip'
import useAppStore from '@lib/store'
import useProfileStore from '@lib/store/profile'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { LimitType, useEnabledCurrenciesQuery } from '@tape.xyz/lens'
import type { CollectModuleType } from '@tape.xyz/lens/custom-types'
import React, { useState } from 'react'

import ChargeQuestion from './ChargeQuestion'
import CollectDuration from './CollectDuration'
import EditionSize from './EditionSize'
import FeeCollectForm from './FeeCollectForm'
import PermissionQuestion from './PermissionQuestion'

const CollectModule = () => {
  const [showModal, setShowModal] = useState(false)
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
  const activeProfile = useProfileStore((state) => state.activeProfile)

  const setCollectType = (data: CollectModuleType) => {
    setUploadedVideo({
      collectModule: { ...uploadedVideo.collectModule, ...data }
    })
  }

  const { data: enabledCurrencies } = useEnabledCurrenciesQuery({
    variables: {
      request: {
        limit: LimitType.Fifty
      }
    },
    skip: !activeProfile?.id
  })

  const getSelectedCollectType = () => {
    const followerOnlyCollect = uploadedVideo.collectModule.followerOnlyCollect
    const timeLimitEnabled = uploadedVideo.collectModule.timeLimitEnabled
    const collectLimitEnabled = uploadedVideo.collectModule.collectLimitEnabled
    const isFeeCollect = uploadedVideo.collectModule.isFeeCollect
    const collectLimit = uploadedVideo.collectModule.collectLimit
    const timeLimit = uploadedVideo.collectModule.timeLimit
    const multiRecipients = uploadedVideo.collectModule.multiRecipients
    if (uploadedVideo.collectModule.isRevertCollect) {
      return `No one can collect this publication`
    }
    return (
      <div className="flex items-center space-x-1">
        <span>
          {followerOnlyCollect ? `Only followers` : `Anyone`} can collect{' '}
          {collectLimitEnabled ? `the ${collectLimit} editions` : ''}{' '}
          {isFeeCollect ? `for set price` : `for free`}{' '}
          {timeLimitEnabled ? `within ${timeLimit} days` : ''}
        </span>
        {uploadedVideo.collectModule.isMultiRecipientFeeCollect && (
          <Tooltip
            content={`Split revenue enabled with ${multiRecipients?.length} recipients`}
          >
            <span>
              <SplitOutline
                className="mr-2 h-5 w-5 rotate-90"
                outline={false}
              />
            </span>
          </Tooltip>
        )}
      </div>
    )
  }

  return (
    <div className="mt-2 pb-2">
      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Trigger>
          <Button
            variant="surface"
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full"
          >
            <Flex align="center" width="100%" justify="between">
              <span>{getSelectedCollectType()}</span>
              <ChevronRightOutline className="h-3 w-3" />
            </Flex>
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 550 }}>
          <Dialog.Title>Collectible</Dialog.Title>
          <Flex direction="column" gap="3">
            <div className="no-scrollbar max-h-[80vh] space-y-2 overflow-y-auto p-0.5">
              <PermissionQuestion setCollectType={setCollectType} />
              {!uploadedVideo.collectModule.isRevertCollect && (
                <CollectDuration setCollectType={setCollectType} />
              )}
              {!uploadedVideo.collectModule.isRevertCollect && (
                <EditionSize setCollectType={setCollectType} />
              )}
              {!uploadedVideo.collectModule.isRevertCollect && (
                <div className="space-y-2">
                  <ChargeQuestion setCollectType={setCollectType} />
                  {(uploadedVideo.collectModule.isFeeCollect ||
                    uploadedVideo.collectModule.collectLimitEnabled) &&
                  !uploadedVideo.collectModule.isRevertCollect &&
                  enabledCurrencies ? (
                    <FeeCollectForm
                      setCollectType={setCollectType}
                      setShowModal={setShowModal}
                      enabledCurrencies={enabledCurrencies.currencies.items}
                    />
                  ) : (
                    <div className="flex justify-end pt-4">
                      <Button
                        type="button"
                        highContrast
                        onClick={() => setShowModal(false)}
                      >
                        Set Collect Type
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}

export default CollectModule
