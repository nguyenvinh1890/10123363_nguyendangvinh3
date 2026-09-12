import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ButtonAction from './components/ButtonAction';
import Header from './components/Header';

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);

  // Thông tin sinh viên
  const studentInfo = {
    fullName: 'Nguyễn Đăng Vinh',
    studentId: '10123363',
    className: 'K21',
    date: '12/09/2026',
    school: 'Khoa Công nghệ Thông tin',
  };

  // Trạng thái tương tác và đếm số lần thao tác
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState('Chưa có thao tác nào');
  const [isPresent, setIsPresent] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'Đóng', style: 'cancel' }]);
    }
  };

  // Xử lý sự kiện nút 1: Xem chi tiết sinh viên
  const handleViewDetails = () => {
    const message = `Họ và tên: ${studentInfo.fullName}\nMã SV: ${studentInfo.studentId}\nLớp: ${studentInfo.className}\nKhoa: ${studentInfo.school}\nNgày thực hiện: ${studentInfo.date}`;
    showAlert('Thông Tin Chi Tiết Sinh Viên', message);
    setClickCount((prev) => prev + 1);
    setLastAction('Đã xem chi tiết sinh viên');
  };

  // Xử lý sự kiện nút 2: Điểm danh / Cập nhật trạng thái
  const handleToggleAttendance = () => {
    const nextState = !isPresent;
    setIsPresent(nextState);
    setClickCount((prev) => prev + 1);
    const statusText = nextState ? 'Điểm danh thành công! (Có mặt)' : 'Đã hủy điểm danh';
    setLastAction(statusText);
    showAlert('Cập Nhật Trạng Thái', statusText);
  };

  // Xử lý sự kiện nút 3: Đặt lại trạng thái
  const handleReset = () => {
    setClickCount(0);
    setIsPresent(false);
    setLastAction('Đã đặt lại trạng thái');
    showAlert('Thông báo', 'Đã đặt lại toàn bộ trạng thái về ban đầu.');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner tiêu đề dự án */}
        <View style={styles.topBanner}>
          <View style={styles.bannerBadgeContainer}>
            <Ionicons name="phone-portrait-outline" size={13} color="#38bdf8" />
            <Text style={styles.bannerBadge}>EXPO • REACT NATIVE</Text>
          </View>
          <Text style={styles.bannerTitle}>DỰ ÁN RNHello</Text>
          <Text style={styles.bannerSubtitle}>Bài tập thực hành phát triển ứng dụng di động</Text>
        </View>

        {/* Component Header - Lần sử dụng 1 */}
        <Header
          title="THÔNG TIN SINH VIÊN"
          subtitle="Dữ liệu sinh viên thực hiện bài thực hành"
          iconName="person-outline"
        />

        {/* Thẻ hiển thị thông tin sinh viên */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NV</Text>
            </View>
            <View style={styles.profileMeta}>
              <Text style={styles.studentName}>{studentInfo.fullName}</Text>
              <Text style={styles.studentIdText}>Mã SV: {studentInfo.studentId}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                isPresent ? styles.statusBadgeActive : styles.statusBadgeInactive,
              ]}
            >
              <Ionicons
                name={isPresent ? 'checkmark-circle' : 'ellipse-outline'}
                size={13}
                color={isPresent ? '#15803d' : '#64748b'}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.statusBadgeText,
                  isPresent ? styles.statusTextActive : styles.statusTextInactive,
                ]}
              >
                {isPresent ? 'Đã điểm danh' : 'Chưa điểm danh'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="school-outline" size={16} color="#64748b" />
              <Text style={styles.infoLabel}>Lớp học:</Text>
            </View>
            <Text style={styles.infoValue}>{studentInfo.className}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="business-outline" size={16} color="#64748b" />
              <Text style={styles.infoLabel}>Đơn vị:</Text>
            </View>
            <Text style={styles.infoValue}>{studentInfo.school}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="calendar-outline" size={16} color="#2563eb" />
              <Text style={styles.infoLabel}>Ngày thực hiện:</Text>
            </View>
            <Text style={styles.infoValueHighlight}>{studentInfo.date}</Text>
          </View>
        </View>

        {/* Component Header - Lần sử dụng 2 */}
        <Header
          title="BẢNG ĐIỀU KHIỂN THAO TÁC"
          subtitle="Tương tác với các nút bấm tái sử dụng (ButtonAction)"
          iconName="settings-outline"
        />

        {/* Danh sách các ButtonAction tái sử dụng */}
        <View style={styles.card}>
          {/* ButtonAction - Lần sử dụng 1 */}
          <ButtonAction
            title="Xem Chi Tiết Sinh Viên"
            iconName="information-circle-outline"
            variant="primary"
            onPress={handleViewDetails}
          />

          {/* ButtonAction - Lần sử dụng 2 */}
          <ButtonAction
            title={isPresent ? 'Hủy Điểm Danh' : 'Điểm Danh Sinh Viên'}
            iconName={isPresent ? 'close-circle-outline' : 'checkmark-circle-outline'}
            variant="success"
            onPress={handleToggleAttendance}
          />

          {/* ButtonAction - Lần sử dụng 3 */}
          <ButtonAction
            title="Đặt Lại Toàn Bộ Thao Tác"
            iconName="refresh-outline"
            variant="outline"
            onPress={handleReset}
          />
        </View>

        {/* Component Header - Lần sử dụng 3 */}
        <Header
          title="NHẬT KÝ TƯƠNG TÁC"
          subtitle="Theo dõi các sự kiện vừa thực thi trên màn hình"
          iconName="time-outline"
        />

        {/* Hộp hiển thị nhật ký tương tác */}
        <View style={[styles.card, styles.logCard]}>
          <View style={styles.logRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="finger-print-outline" size={16} color="#475569" />
              <Text style={styles.logLabel}>Tổng số lần tương tác:</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{clickCount}</Text>
            </View>
          </View>
          <View style={styles.logRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="notifications-outline" size={16} color="#475569" />
              <Text style={styles.logLabel}>Thao tác gần nhất:</Text>
            </View>
            <Text style={styles.logActionText} numberOfLines={2}>
              {lastAction}
            </Text>
          </View>
        </View>

        {/* Footer ghi nhận bản quyền */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 RNHello • {studentInfo.fullName}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
  },
  topBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  bannerBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  bannerBadge: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerSubtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  profileMeta: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  studentIdText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusBadgeActive: {
    backgroundColor: '#dcfce7',
  },
  statusBadgeInactive: {
    backgroundColor: '#f1f5f9',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#15803d',
  },
  statusTextInactive: {
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  infoValueHighlight: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '700',
  },
  logCard: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  logLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
  logActionText: {
    fontSize: 13,
    color: '#0284c7',
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },
  footer: {
    alignItems: 'center',
    marginTop: 6,
    paddingVertical: 10,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
