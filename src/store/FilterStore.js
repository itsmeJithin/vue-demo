import _ from "lodash";

export default {
  namespaced: true,
  state: {
    filters: {}
  },
  getters: {
    filters(state) {
      return state.filters;
    }
  },
  mutations: {
    clearFilters(state) {
      state.filters = [];
    },
    setFilters(state, filter) {
      if (state.filters[filter.key]) {
        state.filters[filter.key] = [...state.filters[filter.key], filter.value];
      } else {
        state.filters[filter.key] = [filter.value];
      }

    },
    removeFilterItem(state, filter) {
      const filterItem = state.filters[filter.key];
      if (filterItem) {
        _.remove(filterItem, value => {
          return value === filter.value;
        });
        if (filterItem.length === 0) {
          delete state.filters[filter.key];
        } else {
          state.filters[filter.key] = filterItem;
        }
      }
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
    }
  }
}