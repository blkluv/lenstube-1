import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import haptic from '~/helpers/haptic'
import { theme } from '~/helpers/theme'

import AnimatedPressable from '../ui/AnimatedPressable'

const styles = StyleSheet.create({
  actionIcon: {
    backgroundColor: theme.colors.backdrop,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
})

const ActionHeader = ({ onPost }: { onPost: () => void }) => {
  const { goBack } = useNavigation()

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <AnimatedPressable onPress={() => goBack()} style={styles.actionIcon}>
        <Ionicons name="close-outline" color={theme.colors.white} size={32} />
      </AnimatedPressable>
      <AnimatedPressable
        onPress={() => {
          onPost()
          haptic()
        }}
        style={styles.actionIcon}
      >
        <Ionicons
          name="paper-plane-outline"
          color={theme.colors.indigo}
          size={22}
        />
      </AnimatedPressable>
    </View>
  )
}

export default ActionHeader