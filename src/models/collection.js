export const collection = {
  state: {
    data: {},
    nowArticleId: null, // 当前文章 ID,
    nowStepCommit: null, // 当前 viewport 内的步骤 commit
  },
  reducers: {
    setData(state, data) {
      return { ...state, data };
    },
    setNowArticleId(state, nowArticleId) {
      return { ...state, nowArticleId };
    },
    setNowStepCommit(state, nowStepCommit) {
      return { ...state, nowStepCommit };
    },
    updateFragment(state, fragment) {
      // 收集所有需要更新的步骤 ID
      const stepIds = fragment.map((node) => node.id);
      // 获得更新后的文集数据
      const newSteps = state.data.steps.map((step) => {
        // 如果是待更新的步骤
        if (stepIds.includes(step.id)) {
          // 返回更新后的步骤
          return fragment.filter((node) => node.id === step.id)[0];
        }
        // 否则还是原来的步骤
        return step;
      });
      return { ...state, data: { ...state.data, steps: newSteps } };
    },
    updateArticle(state, updatedArticle) {
      const updatedArticles = state.data.articles.map((article) =>
        updatedArticle.id === article.id ? updatedArticle : article
      );
      return { ...state, data: { ...state.data, articles: updatedArticles } };
    },
    updateCollectionMeta(state, meta) {
      return { ...state, data: { ...state.data, ...meta } };
    },
  },
  effects: {
    async save(payload, rootState) {
      await fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(rootState.collection.data),
      });
    },
  },
};
