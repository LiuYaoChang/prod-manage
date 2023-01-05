import { AxiosInstance } from 'axios';
// import axios from "axios";
import request from './request';
import React, { Fragment, ReactFragment, useEffect } from "react";
import { useLog } from './log';
import { useHistory } from 'react-router-dom';
import { isDef } from '../share';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setToken } from '@/store/modules/account';

let instance: AxiosInstance;

function getInstance() {
  if (!instance) {
    instance = request.getInstance();
    return instance;
  }
  return instance;
}

// 服务封装
// axios 请求监听
function useAjaxEffect1() {
  const instance = getInstance();
  const { writeRef } = useLog();
  const token = useAppSelector((state) => state.account.token)
  const dispatch = useAppDispatch()
  const history = useHistory();
  useEffect(() => {
    function request(config: any) {
      // writeRef.current(`新请求：${config.url}`);
      // 如果有token 要追加到请求头
      // store
      try {

        // console.log("🚀 ~ file: request.ts:93 ~ Request ~ store", store)
        // const account = store.getState().account;
        if (isDef(token) && token !== '') {
          const originalHeaders = config.headers;
          const headers = Object.assign({}, originalHeaders, {
            token: token
          })
          config.headers = headers;
        }
        return config
      } catch (error) {
        console.log("🚀 ~ file: effect.tsx:46 ~ request ~ error", error)
      }
      // const token = useAppSelector((state) => state.account.token);
      // if (isDef(token)) {
      //   const originalHeaders = config.headers;

      //   const headers = Object.assign({}, originalHeaders, {
      //     token
      //   })
      //   config.headers = headers;
      // }
    }

    function fail(error: any) {
      // writeRef.current(`请求失败：${error.message}`);
      return Promise.reject(error);
    }

    function success(response: any) {
      const { code, data, msg } = response.data
      if (code === 0) {
        return data
      } else if (code === 401) {
        dispatch(setToken(''))
        history.replace('/account/login')
        return;
      }
      $message.error(msg || '获取数据失败')
      return Promise.reject(response)
      // writeRef.current(`响应成功：${response.config.url}`);
      // return Promise.resolve(response);
    }

    const inter1 = instance.interceptors.request.use(request, fail);
    const inter2 = instance.interceptors.response.use(success, fail);

    return () => {
      instance.interceptors.request.eject(inter1);
      instance.interceptors.response.eject(inter2);
    };
  }, [writeRef]);
}
function useAjaxEffect2() {}

// 服务钩子集合
export function useAjaxEffect() {
  useAjaxEffect1();
  useAjaxEffect2();
}

// 服务片段
export function AjaxEffectFragment() {
  useAjaxEffect();
  return <Fragment />;
}
