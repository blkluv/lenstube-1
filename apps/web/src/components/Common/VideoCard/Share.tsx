import Tooltip from '@components/UIElements/Tooltip'
import { IconButton } from '@radix-ui/themes'
import { useCopyToClipboard } from '@tape.xyz/browser'
import { STATIC_ASSETS, TAPE_WEBSITE_URL } from '@tape.xyz/constants'
import { EVENTS, getSharableLink, imageCdn, Tower } from '@tape.xyz/generic'
import type { PrimaryPublication } from '@tape.xyz/lens'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { FC } from 'react'
import React from 'react'

import EmbedVideo from '../EmbedVideo'
import CopyOutline from '../Icons/CopyOutline'
import MirrorOutline from '../Icons/MirrorOutline'
import MirrorVideo from '../MirrorVideo'

type Props = {
  video: PrimaryPublication
}

const Share: FC<Props> = ({ video }) => {
  const [copy] = useCopyToClipboard()
  const { resolvedTheme } = useTheme()

  const onCopyVideoUrl = async () => {
    await copy(`${TAPE_WEBSITE_URL}/watch/${video.id}`)
    Tower.track(EVENTS.PUBLICATION.PERMALINK)
  }

  return (
    <div>
      <div className="no-scrollbar mb-4 flex flex-nowrap items-center space-x-3 overflow-x-auto">
        <EmbedVideo videoId={video.id} />
        <MirrorVideo video={video}>
          <div className="rounded-full bg-gray-200 p-3 dark:bg-gray-800">
            <MirrorOutline className="h-5 w-5" />
          </div>
        </MirrorVideo>
        <Link
          className="rounded-full"
          target="_blank"
          rel="noreferrer"
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.HEY)}
          href={getSharableLink('hey', video)}
        >
          <img
            src={imageCdn(
              `${STATIC_ASSETS}/images/social/hey-logo.svg`,
              'AVATAR_LG'
            )}
            className="h-10 w-10 max-w-none"
            loading="eager"
            alt="hey"
            draggable={false}
          />
        </Link>
        <span className="middot" />
        <Link
          className="rounded-full"
          target="_blank"
          rel="noreferrer"
          href={getSharableLink('x', video)}
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.X)}
        >
          <div className="rounded-full bg-gray-200 p-3 dark:bg-gray-800">
            {resolvedTheme === 'dark' ? (
              <img
                src={imageCdn(
                  `${STATIC_ASSETS}/images/social/x-white.png`,
                  'AVATAR'
                )}
                className="h-4 w-4"
                height={16}
                width={16}
                alt="X Logo"
                draggable={false}
              />
            ) : (
              <img
                src={imageCdn(
                  `${STATIC_ASSETS}/images/social/x-black.png`,
                  'AVATAR'
                )}
                className="h-4 w-4"
                height={16}
                width={16}
                alt="X Logo"
                draggable={false}
              />
            )}
          </div>
        </Link>
        <Link
          href={getSharableLink('reddit', video)}
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.REDDIT)}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={imageCdn(
              `${STATIC_ASSETS}/images/social/reddit-logo.webp`,
              'AVATAR_LG'
            )}
            className="h-10 w-10 max-w-none rounded-full"
            loading="eager"
            alt="reddit"
            draggable={false}
          />
        </Link>
        <Link
          href={getSharableLink('linkedin', video)}
          target="_blank"
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.LINKEDIN)}
          rel="noreferrer"
        >
          <img
            src={imageCdn(
              `${STATIC_ASSETS}/images/social/linkedin-logo.png`,
              'AVATAR_LG'
            )}
            loading="eager"
            alt="linkedin"
            className="h-10 w-10 max-w-none rounded-full"
            draggable={false}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-2 dark:border-gray-800">
        <div className="select-all truncate text-sm">
          {TAPE_WEBSITE_URL}/watch/{video.id}
        </div>
        <Tooltip content="Copy" placement="top">
          <IconButton
            variant="soft"
            size="1"
            className="ml-2 hover:opacity-60 focus:outline-none"
            onClick={() => onCopyVideoUrl()}
          >
            <CopyOutline className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default Share
