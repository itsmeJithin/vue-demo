import _ from "lodash";
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    filters: {},
    isFilterUpdated: false,
    availableFilters: []
  },
  getters: {
    filters(state) {
      return state.filters;
    },
    isFilterUpdated(state) {
      return state.isFilterUpdated;
    },
    availableFilters(state) {
      return state.availableFilters;
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
        console.log(state.filters);
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
    },
    setAvailableFilters(state, filters) {
      state.availableFilters = filters;
    },
    initialiseAppliedFilters(state, filters) {
      state.filters = filters;
      state.isFilterUpdated = true;
    }
  },
  actions: {
    initialiseAppliedFilters({commit}, filters) {
      commit('initialiseAppliedFilters', filters);
    },
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
    },
    /**
     * fetching available filters
     * @author Jithin Vijayan
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetchAvailableFilters({commit}) {
      return new Promise((resolve, reject) => {
        axios.get("https://run.mocky.io/v3/58f33514-6d76-4fc1-b140-57d7ab720d83")
          .then(response => {
            if (response.data) {
              commit('setAvailableFilters', response.data);
              resolve()
            } else {
              reject("Error occurred while initialising page");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
}