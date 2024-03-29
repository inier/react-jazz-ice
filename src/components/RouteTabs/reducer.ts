interface ITab {
  keepAlive?: boolean;
  tabId?: string;
  [propName: string]: any;
}

export const initialState: ITab = {
  tabs: [],
  currentTab: null,
  historyList: [],
  events: {},
  eventTriggerList: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TAB_RESET': {
      return {
        ...initialState,
      };
    }
    case 'TAB_ADD': {
      return {
        ...state,
        tabs: action.payload ? [...state.tabs, action?.payload] : state.tabs,
      };
    }
    case 'TAB_UPDATE': {
      const newTabs = [...state.tabs];
      const targetTabIndex = state.tabs.findIndex((item) => item.tabId === action.payload.tabId);
      if (targetTabIndex > -1) {
        newTabs.splice(targetTabIndex, 1, action.payload);
        return {
          ...state,
          tabs: newTabs,
        };
      }
      return state;
    }
    case 'TAB_DELETE': {
      const willDeleteIds = action.payload instanceof Array ? action.payload : [action.payload];
      const newTabs = [...state.tabs].filter((item) => !willDeleteIds.includes(item.tabId));
      return {
        ...state,
        tabs: newTabs,
      };
    }
    case 'CURRENT_UPDATE': {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    case 'HISTORY_ADD': {
      return {
        ...state,
        historyList: action.payload ? [...state.historyList, action?.payload] : state.historyList,
      };
    }
    case 'EVENTS_ADD': {
      const { tabId, eventName, fn } = action.payload;
      const events = { ...state.events };

      if (!tabId || !eventName || !fn) {
        return state;
      }

      if (!events[tabId]) {
        events[tabId] = {};
      }
      if (!events[tabId][eventName]) {
        events[tabId][eventName] = [];
      }
      events[tabId][eventName].push(fn);

      return {
        ...state,
        events,
      };
    }
    case 'EVENT_DELETE': {
      const { tabId, eventName, fn } = action.payload;
      let events = { ...state.events };

      if (!tabId) {
        events = {};
      } else if (!eventName) {
        events[tabId] = {};
      } else if (!fn) {
        events[tabId][eventName] = [];
      } else {
        events[tabId][eventName] = events[tabId][eventName].filter((item) => item !== fn);
      }

      return {
        ...state,
        events,
      };
    }
    case 'EVENT_TRIGGER_LIST_ADD': {
      const { tabId, eventName, params } = action.payload;
      const eventTriggerList = { ...state.eventTriggerList };
      const newItem = { eventName, params };

      if (!tabId || !eventName) {
        return state;
      }

      if (!eventTriggerList[tabId]) {
        eventTriggerList[tabId] = [];
      }
      if (!eventTriggerList[tabId].some((item) => JSON.stringify(item) === JSON.stringify(newItem))) {
        eventTriggerList[tabId].push({ eventName, params });
      }

      return {
        ...state,
        eventTriggerList,
      };
    }
    case 'EVENT_TRIGGER_LIST_DELETE': {
      const { tabId, eventName } = action.payload;
      let eventTriggerList = { ...state.eventTriggerList };

      if (!tabId) {
        eventTriggerList = {};
      } else if (!eventName) {
        eventTriggerList[tabId] = [];
      } else {
        eventTriggerList[tabId] = eventTriggerList[tabId].filter((item) => item.eventName !== eventName);
      }

      return {
        ...state,
        eventTriggerList,
      };
    }
    default:
      return state;
  }
};
