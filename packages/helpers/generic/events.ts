export const EVENTS = {
  PAGEVIEW: 'Pageview',
  DEPOSIT_MATIC: 'Deposit Matic',
  FILTER_CATEGORIES: 'Filter Categories',
  CLICK_VIEW_METADATA: 'Click View Metadata',
  CLICK_VIEW_TOKEN: 'Click View Token',
  CLICK_VIEW_PROOF: 'Click View Proof',
  CLICK_USER_MENU: 'Click User Menu',
  OPEN_COLLECT: 'Open Collect',
  SEARCH: 'Search',
  PAGE_VIEW: {
    HOME: 'Home Page',
    FEED: 'Feed Page',
    LOGIN: 'Login Page',
    EXPLORE: 'Explore Page',
    PROFILE: 'Profile Page',
    EXPLORE_TRENDING: 'Trending Page',
    EXPLORE_INTERESTING: 'Interesting Page',
    EXPLORE_POPULAR: 'Popular Page',
    THANKS: 'Thanks Page',
    UPLOAD: {
      DROPZONE: 'DropZone Page',
      STEPS: 'Upload Steps Page'
    },
    SETTINGS: 'Settings Page',
    WATCH: 'Watch Page',
    BYTES: 'Bytes Page',
    NOTIFICATIONS: 'Notifications Page'
  },
  MANAGER: {
    TOGGLE: 'Toggle Lens Manager'
  },
  PUBLICATION: {
    NEW_POST: 'New post',
    NEW_COMMENT: 'New comment',
    LIKE: 'Like publication',
    MIRROR: 'Mirror publication',
    PIN: 'Pin publication',
    UNPIN: 'Unpin publication',
    DELETE: 'Delete publication',
    REPORT: 'Report Publication',
    TOGGLE_INTEREST: 'Toggle Publication Interest',
    PERMALINK: 'Permalink publication',
    COLLECT: 'Collect publication',
    TIP: {
      OPEN: 'Open Tip Modal',
      SENT: 'Tip Sent'
    },
    SHARE: {
      HEY: 'Share to Hey',
      X: 'Share to X',
      REDDIT: 'Share to Reddit',
      LINKEDIN: 'Share to LinkedIn'
    }
  },
  OPEN_ACTIONS: {
    COLLECT_ZORA: 'Collect Zora',
    OPEN_IN_ZORA: 'Open in Zora',
    OPEN_IN_UNLONELY: 'Open in Unlonely',
    WATCH_UNLONELY_LIVE: 'Watch Unlonely Live'
  },
  AUTH: {
    CONNECT_WALLET: 'Connect Wallet',
    SIGN_IN_WITH_LENS: 'Sign in with Lens',
    SIGN_OUT: 'Sign Out'
  },
  PROFILE: {
    CLICK_PROFILE_VIDEOS: 'Click Profile Videos',
    CLICK_PROFILE_BYTES: 'Click Profile Bytes',
    CLICK_OTHER_PROFILES: 'Click Other Profiles',
    UPDATE: 'Update Profile',
    FOLLOW: 'Follow',
    SUPER_FOLLOW: 'Super Follow',
    UNFOLLOW: 'Unfollow',
    SETTINGS: {
      TOGGLE_REVERT_FOLLOW: 'Toggle Revert Follow'
    }
  },
  EMBED_VIDEO: {
    OPEN: 'Open Embed',
    COPY: 'Copy Embed',
    LOADED: 'Embed Video Loaded',
    CLICK_WATCH_ON_TAPE: 'Click Watch on Tape',
    CLICK_EMBED_TITLE: 'Click Embed Title',
    CLICK_EMBED_PROFILE: 'Click Embed Profile'
  },
  PROFILE_INTERESTS: {
    ADD: 'Add Profile Interest',
    REMOVE: 'Remove Profile Interest',
    VIEW: 'View Profile Interests'
  },
  NOTIFICATIONS: {
    SWITCH_NOTIFICATION_TAB: 'Switch notifications tab',
    CLICK_NOTIFICATIONS: 'Click Notifications'
  },
  SYSTEM: {
    TOGGLE_THEME: 'Toggle Theme',
    MORE_MENU: {
      OPEN: 'Open More Menu',
      GITHUB: 'Click Github',
      DISCORD: 'Click Discord',
      THANKS: 'Click Thanks',
      FEEDBACK: 'Click Feedback',
      BRAND_KIT: 'Click Brand Kit',
      ROADMAP: 'Click Roadmap',
      TERMS: 'Click Terms',
      PRIVACY: 'Click Privacy',
      STATUS: 'Click Status',
      X: 'Click X'
    }
  }
}

export const ALL_EVENTS = {
  ...EVENTS,
  ...EVENTS.PAGE_VIEW,
  ...EVENTS.PAGE_VIEW.UPLOAD,
  ...EVENTS.MANAGER,
  ...EVENTS.PUBLICATION,
  ...EVENTS.PUBLICATION.TIP,
  ...EVENTS.PUBLICATION.SHARE,
  ...EVENTS.OPEN_ACTIONS,
  ...EVENTS.AUTH,
  ...EVENTS.PROFILE,
  ...EVENTS.PROFILE.SETTINGS,
  ...EVENTS.SYSTEM,
  ...EVENTS.SYSTEM.MORE_MENU,
  ...EVENTS.NOTIFICATIONS,
  ...EVENTS.EMBED_VIDEO,
  ...EVENTS.PROFILE_INTERESTS
}
