import Vue from "vue";
import _ from "lodash";
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    filters: {},
    filtersLastModified: null,
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
    filtersLastModified(state) {
      return state.filtersLastModified;
    },
    availableFilters(state) {
      return state.availableFilters;
    },
    isFilterApplied: (state) => (key, value) => {
      if (state.filters[key] && state.filters[key].length) {
        return _.findIndex(state.filters[key], item => {
          return String(value) === String(item.value);
        });
      }
      return -1;
    },
    getAppliedFilters: (state) => () => {
      return _.flatMapDeep(state.filters, item => {
        return item;
      });
    }
  },
  mutations: {
    clearFilters(state) {
      state.filters = [];
    },
    setFilters(state, filter) {
      if (state.filters[filter.key]) {
        if (!filter.isMultiSelectEnabled) {
          console.log(filter);
          Vue.set(state.filters, filter.key, [filter]);
        } else {
          Vue.set(state.filters, filter.key, [...state.filters[filter.key], filter]);
        }
      } else {
        Vue.set(state.filters, filter.key, [filter]);
      }
      Vue.set(state, 'isFilterUpdated', true);
      Vue.set(state, 'filtersLastModified', Date.now());
    },
    removeFilterItem(state, filter) {
      const filterItem = state.filters[filter.key];
      const isMultiSelectEnabled = _.has(filter, "isMultiSelectEnabled") ? filter.isMultiSelectEnabled : 1;
      if (filterItem) {
        _.remove(filterItem, item => {
          return (item.key === filter.key && !isMultiSelectEnabled) || (item.value === filter.value);
        });
        if (filterItem.length === 0) {
          const stateFilters = _.cloneDeep(state.filters);
          delete stateFilters[filter.key];
          Vue.set(state, 'filters', stateFilters);
        } else {
          Vue.set(state.filters, filter.key, filterItem);
        }
        Vue.set(state, 'filtersLastModified', Date.now());
      }
    },
    setFilterChangeFlag(state) {
      Vue.set(state, 'isFilterUpdated', true);
    },
    resetFilterChangeFlag(state) {
      Vue.set(state, 'isFilterUpdated', false);
    },
    setAvailableFilters(state, filters) {
      Vue.set(state, 'availableFilters', filters);
    },
    initialiseAppliedFilters(state, filters) {
      Vue.set(state, 'filters', filters);
      Vue.set(state, 'isFilterUpdated', true);
      Vue.set(state, 'filtersLastModified', Date.now());
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
    setFilterChangeFlag({commit}) {
      commit('setFilterChangeFlag');
    },
    removeFilterItem({commit}, item) {
      commit('removeFilterItem', item);
      commit('setFilterChangeFlag');
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