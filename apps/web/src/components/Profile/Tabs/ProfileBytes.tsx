import VideoOptions from '@components/Common/VideoCard/VideoOptions'
import LatestBytesShimmer from '@components/Shimmers/LatestBytesShimmer'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import {
  FALLBACK_COVER_URL,
  INFINITE_SCROLL_ROOT_MARGIN,
  LENS_CUSTOM_FILTERS,
  LENSTUBE_BYTES_APP_ID
} from '@tape.xyz/constants'
import {
  getPublicationData,
  getThumbnailUrl,
  imageCdn
} from '@tape.xyz/generic'
import type { Post, PublicationsRequest } from '@tape.xyz/lens'
import {
  LimitType,
  PublicationType,
  usePublicationsQuery
} from '@tape.xyz/lens'
import { Loader } from '@tape.xyz/ui'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'
import { useInView } from 'react-cool-inview'

type Props = {
  profileId: string
}

const ProfileBytes: FC<Props> = ({ profileId }) => {
  const request: PublicationsRequest = {
    where: {
      metadata: {
        // mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo],
        publishedOn: [LENSTUBE_BYTES_APP_ID]
      },
      publicationTypes: [PublicationType.Post],
      customFilters: LENS_CUSTOM_FILTERS,
      from: [profileId]
    },
    limit: LimitType.Fifty
  }

  const { data, loading, error, fetchMore } = usePublicationsQuery({
    variables: { request },
    skip: !profileId
  })

  const bytes = data?.publications?.items as Post[]
  const pageInfo = data?.publications?.pageInfo

  const { observe } = useInView({
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      })
    }
  })

  if (loading) {
    return <LatestBytesShimmer count={4} />
  }

  if (data?.publications?.items?.length === 0) {
    return <NoDataFound isCenter withImage text={`No bytes found`} />
  }

  return (
    <div className="w-full">
      {!error && !loading && (
        <div className="laptop:grid-cols-5 grid grid-cols-2 justify-center gap-2 md:grid-cols-3">
          {[...bytes, ...bytes].map((byte) => {
            const thumbnailUrl = imageCdn(
              getThumbnailUrl(byte.metadata),
              'THUMBNAIL_V'
            )
            return (
              <Link
                key={byte.id}
                href={`/bytes/${byte.id}`}
                className="hover:border-brand-500 rounded-large tape-border relative aspect-[9/16] w-full flex-none place-self-center overflow-hidden md:h-[380px]"
              >
                <img
                  className="h-full w-full object-cover"
                  src={imageCdn(thumbnailUrl, 'THUMBNAIL_V')}
                  alt="thumbnail"
                  draggable={false}
                  onError={({ currentTarget }) => {
                    currentTarget.src = FALLBACK_COVER_URL
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/30 px-4 py-2 text-white">
                  <h1 className="line-clamp-2 break-words font-bold">
                    {getPublicationData(byte.metadata)?.title}
                  </h1>
                </div>
                <div
                  className="absolute right-2 top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <VideoOptions video={byte} variant="solid" />
                </div>
              </Link>
            )
          })}
          {pageInfo?.next && (
            <span ref={observe} className="flex justify-center p-10">
              <Loader />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileBytes
