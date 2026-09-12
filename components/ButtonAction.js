import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * ButtonAction Component tái sử dụng
 * @param {string} title - Nhãn văn bản của nút
 * @param {function} onPress - Hàm xử lý sự kiện bấm
 * @param {string} variant - Kiểu hiển thị ('primary' | 'success' | 'outline' | 'warning')
 * @param {string} iconName - Tên icon từ bộ Ionicons (tùy chọn)
 * @param {object} style - Tùy biến kiểu dáng nút
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 */
export default function ButtonAction({
  title,
  onPress,
  variant = 'primary',
  iconName,
  style,
  disabled = false,
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return styles.btnSuccess;
      case 'warning':
        return styles.btnWarning;
      case 'outline':
        return styles.btnOutline;
      case 'primary':
      default:
        return styles.btnPrimary;
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return '#2563eb';
    }
    return '#ffffff';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.baseButton, getVariantStyle(), disabled && styles.btnDisabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentRow}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={18}
            color={getTextColor()}
            style={styles.btnIcon}
          />
        )}
        <Text style={[styles.baseText, { color: getTextColor() }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
  },
  btnSuccess: {
    backgroundColor: '#059669',
  },
  btnWarning: {
    backgroundColor: '#d97706',
  },
  btnOutline: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#2563eb',
    elevation: 0,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  btnIcon: {
    marginRight: 2,
  },
});
