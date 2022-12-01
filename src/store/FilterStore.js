import _ from "lodash";

export default {
  namespaced: true,
  state: {
    filters: {},
    isFilterUpdated: false
  },
  getters: {
    filters(state) {
      return state.filters;
    },
    isFilterUpdated(state) {
      return state.isFilterUpdated;
    }
  },
  mutations: {
    clearFilters(state) {
      state.filters = [];
    },
    setFilters(state, filter) {
      if (state.filters[filter.key]) {
        state.filters[filter.key] = [...state.filters[filter.key], filter];
      } else {
        state.filters[filter.key] = [filter];
      }
      state.isFilterUpdated = true;
    },
    removeFilterItem(state, filter) {
      const filterItem = state.filters[filter.key];
      if (filterItem) {
        _.remove(filterItem, item => {
          return item.value === filter.value;
        });
        if (filterItem.length === 0) {
          delete state.filters[filter.key];
        } else {
          state.filters[filter.key] = filterItem;
        }
        state.isFilterUpdated = true;
      }
    },
    resetFilterChangeFlag(state) {
      state.isFilterUpdated = false;
    }
  },
  actions: {
    addFilterItems({commit}, filterItem) {
      commit('setFilters', filterItem);
    },
    resetFilters({commit}) {
      commit('clearFilters');
    },
    removeFilterItem({commit}, item) {
      commit('removeFilterItem', item);
    },
    resetFilterChangeFlag({commit}) {
      commit('resetFilterChangeFlag');
    }
  }
}