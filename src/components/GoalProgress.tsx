import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GoalProgressProps {
  completedCount?: number;
  totalCount?: number;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ completedCount = 9, totalCount = 12 }) => {
  const rows = [];
  let currentCount = 0;
  
  // Create rows with up to 9 boxes each
  for (let i = 0; i < Math.ceil(totalCount / 9); i++) {
    const boxes = [];
    for (let j = 0; j < Math.min(9, totalCount - (i * 9)); j++) {
      currentCount++;
      boxes.push(
        <View 
          key={j} 
          style={[
            styles.goalBox, 
            currentCount <= completedCount ? styles.goalBoxCompleted : styles.goalBoxIncomplete
          ]} 
        />
      );
    }
    rows.push(
      <View key={i} style={styles.goalRow}>
        {boxes}
      </View>
    );
  }
  
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.goalTitle}>Goal</Text>
      {rows}
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 19,
    color: '#5D4037',
    fontWeight: '400',
    marginBottom: 15,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  goalBox: {
    width: 28,
    height: 42,
    borderRadius: 5,
    marginRight: 8,
  },
  goalBoxCompleted: {
    backgroundColor: '#E6A191',
  },
  goalBoxIncomplete: {
    backgroundColor: '#E6CDB7',
  },
});

export default GoalProgress; 