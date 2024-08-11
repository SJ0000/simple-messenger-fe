import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {ApiClient} from "@/common/api/ApiClient";
import {NotificationTokenDto} from "@/domain/notification/dto";
import {NotificationService} from "@/domain/notification/NotificationService";

export const useNotificationStore = defineStore(
  "notification",
  () => {
    const apiClient = ApiClient.getInstance()
    const fcmToken: Ref<string | undefined> = ref(undefined);

    async function initialize() {
      if (fcmToken.value != undefined) {
        try {
          await registerFcmToken(fcmToken.value)
        } catch (error) {
          // error code 유효기간 만료면 재발급 후 갱신
          const token = await NotificationService.getInstance().createFcmToken()
          await updateFcmToken(token)

          // 이미 존재하는 토큰이 있는 경우면 사용자 설정에 따라서
          // 기존에 등록된 기기가 있습니다. 기기를 변경하시겠습니까?
          // YES -  삭제 후 신규 생성
          // No면 알림 미사용
          // 알림 전략이 진짜 복잡하다.

        }
      } else {
        // fcm token이 없는 경우 생성 후 요청
        const token = await NotificationService.getInstance().createFcmToken()
        await registerFcmToken(token)
      }
    }

    async function registerFcmToken(token: string) {
      const dto = new NotificationTokenDto(token)
      await apiClient.postNotificationToken(dto)
    }

    async function updateFcmToken(token : string){
      const dto = new NotificationTokenDto(token)
      await apiClient.patchNotificationToken(dto)
    }

    return {
      fcmToken,
      initialize,
    }
  },
  {persist: true}
)
