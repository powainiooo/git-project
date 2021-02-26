// 1邀请好友砍价
export const binInvited = (nickname,kj_user_id,cover) => {
  return {
    title: nickname + '...正在参加砍价活动，就差一点了，快来帮TA!',
    path: `/pages/bargain/item?kj_user_id=` + kj_user_id + `&money=`,
    imageUrl: cover,
  }
}