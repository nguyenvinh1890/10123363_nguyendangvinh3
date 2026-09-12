import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Header Component tái sử dụng
 * @param {string} title - Tiêu đề chính
 * @param {string} subtitle - Tiêu đề phụ (tùy chọn)
 * @param {string} iconName - Tên icon từ bộ Ionicons (tùy chọn)
 * @param {object} style - Tùy biến kiểu dáng bên ngoài
 */
export default function Header({ title, subtitle, iconName, style }) {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.titleRow}>
        {iconName && (
          <View style={styles.iconBadge}>
            <Ionicons name={iconName} size={18} color="#2563eb" />
          </View>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 12,
    paddingHorizontal: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '400',
    paddingLeft: 42,
  },
  divider: {
    height: 3,
    width: 36,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginTop: 8,
    marginLeft: 42,
  },
});
