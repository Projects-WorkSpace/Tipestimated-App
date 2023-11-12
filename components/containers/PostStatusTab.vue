<script setup lang="ts">
import {
  ActivePredictedPosts,
  ExpiredPredictedPosts,
} from "~/graphql/accounts";
import { IActivePostData, IExpiredPostData, IPostNode } from "~/types/accounts";
import { uiTabStyles } from "~/helpers";

const route = useRoute();
const activePostData = ref<IPostNode[]>([]);
const expiredPostData = ref<IPostNode[]>([]);
const loadingStatus = ref({
  active: false,
  expired: false,
  all: true,
});

const items = [
  {
    key: "active",
    label: "Active",
  },
  {
    key: "expired",
    label: "Expired",
  },
];

const fetchActivePostData = async (tipsterId: string) => {
  loadingStatus.value.active = true;
  const { result, onResult, onError } = useQuery<IActivePostData>(
    ActivePredictedPosts,
    { tipsterId: tipsterId },
  );
  if (result.value) {
    console.log("Got results here");
  }
  onError((error) => {
    loadingStatus.value.active = false;
    loadingStatus.value.all = false;
    console.log("Error value: ", error);
  });

  onResult((result) => {
    loadingStatus.value.all = false;
    loadingStatus.value.active = false;
    activePostData.value =
      result.data.activePredictedPosts.edges?.map((post) => post.node) ?? [];
  });
};

const fetchExpiredPostData = async (tipsterId: string) => {
  loadingStatus.value.expired = true;
  const { onResult, onError } = useQuery<IExpiredPostData>(
    ExpiredPredictedPosts,
    { tipsterId: tipsterId },
  );

  onError((error) => {
    loadingStatus.value.all = false;
    loadingStatus.value.expired = false;
    console.log("Error value: ", error);
  });

  onResult((result) => {
    loadingStatus.value.all = false;
    loadingStatus.value.expired = false;
    expiredPostData.value =
      result.data.expiredPredictedPosts.edges?.map((post) => post.node) ?? [];
  });
};

function onChange(index: any) {
  const item = items[index];
  if (item.key === "active") {
    fetchActivePostData(route.params.tipsterID as string);
  } else if (item.key === "expired") {
    fetchExpiredPostData(route.params.tipsterID as string);
  }
}

const updateLike = (payload: boolean, statusType: string, postId: string) => {
  if (statusType === "active") {
    let postIndex = activePostData.value.findIndex(
      (post) => post.id === postId,
    );
    if (postIndex !== -1) {
      let newNode = { ...activePostData.value[postIndex] };
      newNode.isLikedByMe = payload;
      if (payload) {
        newNode.likes += 1;
      } else {
        newNode.likes -= 1;
      }
      activePostData.value[postIndex] = { ...newNode };
    }
  }
};

onMounted(() => {
  fetchActivePostData(route.params.tipsterID as string);
});
</script>

<template>
  <div class="w-full flex flex-col">
    <Transition mode="out-in">
      <div
        v-if="loadingStatus.all"
        class="w-full flex flex-col items-center pt-16"
      >
        <UtilsStarLoading />
      </div>
      <div v-else class="w-full flex flex-col">
        <UTabs
          :items="items"
          class="w-full"
          :ui="uiTabStyles"
          @change="onChange"
        >
          <template #item="{ item }">
            <div v-if="item.key === 'active'" class="space-y-3 mt-4">
              <div class="w-full">
                <Transition mode="out-in">
                  <div v-if="!loadingStatus.active" class="w-full">
                    <Transition mode="out-in">
                      <div
                        v-if="activePostData"
                        class="w-full flex flex-col gap-y-3"
                      >
                        <div v-for="node in activePostData" class="w-full">
                          <SectionsAccountPostCard
                            :node="node"
                            @update-like="updateLike"
                            status-type="active"
                            :pen-name="node.tipsterId.penName"
                            :img-url="node.tipsterId.imageUrl"
                          />
                        </div>
                      </div>
                      <div
                        v-else
                        class="w-full pt-16 flex flex-col items-center"
                      >
                        <h3
                          class="text-xl font-semibold text-neutral-600 tracking-wide"
                        >
                          Empty here!
                        </h3>
                        <p class="text-base">
                          Currently there are no active post to check here.
                        </p>
                      </div>
                    </Transition>
                  </div>
                  <div v-else class="w-full flex flex-col items-center pt-16">
                    <UtilsStarLoading />
                  </div>
                </Transition>
              </div>
            </div>
            <div v-else-if="item.key === 'expired'" class="space-y-3 mt-4">
              <div class="w-full">
                <Transition mode="out-in">
                  <div v-if="!loadingStatus.expired" class="w-full">
                    <Transition mode="out-in">
                      <div
                        v-if="expiredPostData.length !== 0"
                        class="w-full flex flex-col gap-y-3"
                      >
                        <div v-for="node in expiredPostData" class="w-full">
                          <SectionsAccountPostCard
                            :node="node"
                            @update-like="updateLike"
                            status-type="expired"
                            :pen-name="node.tipsterId.penName"
                            :img-url="node.tipsterId.imageUrl"
                          />
                        </div>
                      </div>
                      <div
                        v-else
                        class="w-full pt-16 flex flex-col items-center"
                      >
                        <h3
                          class="text-xl font-semibold text-neutral-600 tracking-wide"
                        >
                          Empty here!
                        </h3>
                        <p class="text-base">
                          Currently there are no expired post to check here.
                        </p>
                      </div>
                    </Transition>
                  </div>
                  <div v-else class="w-full flex flex-col items-center pt-16">
                    <UtilsStarLoading />
                  </div>
                </Transition>
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </Transition>
  </div>
</template>
