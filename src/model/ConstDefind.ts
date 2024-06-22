/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/model/Model.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import {
  ViewColumn,
  QuickPickItem,
  MessageItem,
  Comment,
  MarkdownString,
  CommentMode,
  CommentAuthorInformation,
  CommentThread,
} from "vscode";
import { getDayNowM, getRemakeName } from "../utils/SystemUtils";

export interface IQuickItemEx<T> extends QuickPickItem {
  value: T;
}

export const singleLineFlag = {
  bash: "#",
  c: "//",
  cpp: "//",
  csharp: "//",
  golang: "//",
  java: "//",
  javascript: "//",
  kotlin: "//",
  mysql: "--",
  php: "//",
  python: "#",
  python3: "#",
  ruby: "#",
  rust: "//",
  scala: "//",
  swift: "//",
  typescript: "//",
};

export enum UserStatus {
  SignedIn = 1,
  SignedOut = 2,
}

export enum TestSolutionType {
  Type_1 = 1,
  Type_2 = 2,
  Type_3 = 3,
  Type_4 = 4,
  Type_5 = 5,
  Type_6 = 6,
}

export interface ITestSolutionData {
  filePath: string;
  testString: undefined | string;
  allCase: undefined | boolean;
  type: TestSolutionType;
  result: string | undefined;
}

export const defaultTestSolutionData: ITestSolutionData = {
  filePath: "",
  testString: undefined,
  allCase: undefined,
  type: TestSolutionType.Type_1,
  result: undefined,
};

export const AllProgramLanguage: string[] = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "golang",
  "java",
  "javascript",
  "kotlin",
  "mysql",
  "php",
  "python",
  "python3",
  "ruby",
  "rust",
  "scala",
  "swift",
  "typescript",
];

export const langExt: Map<string, string> = new Map([
  ["bash", "sh"],
  ["c", "c"],
  ["cpp", "cpp"],
  ["csharp", "cs"],
  ["golang", "go"],
  ["java", "java"],
  ["javascript", "js"],
  ["kotlin", "kt"],
  ["mysql", "sql"],
  ["php", "php"],
  ["python", "py"],
  ["python3", "py"],
  ["ruby", "rb"],
  ["rust", "rs"],
  ["scala", "scala"],
  ["swift", "swift"],
  ["typescript", "ts"],
]);

export enum ProblemState {
  AC = 1,
  NotAC = 2,
  Unknown = 3,
}

export enum Endpoint {
  LeetCode = "leetcode",
  LeetCodeCN = "leetcode-cn",
}

export enum RootNodeSort {
  ZERO = 0,
  Day = 1,
  All = 2,
  Difficulty = 3,
  Tag = 4,
  Company = 5,
  Favorite = 6,
  Choice = 7,
  Score = 8,
  ScoreRange = 9,
  Contest = 9,
  RecentContestList = 10,
  DIFEASY = 1,
  DIFMID = 2,
  DIFHARD = 3,
}

export interface ITodayData {
  date: string; // 日期
  userStatus: string; // 状态   'NOT_START' 'FINISH'
}

export interface IScoreData {
  Rating: number; // 分数
  score: string; // rank分
  ID: number; // 题目ID
  ContestID_en: string; // 周赛名称
  ProblemIndex: string; // 周赛第几题
  ContestSlug: string; // 周赛名称
}

export enum BricksNormalId {
  NeedReview = "bricksneedreview", // 有活需要复习
  NeedReviewDesc = "别吹牛了,工头让我叫你快去搬砖了",
  NeedReDate = "bricksneedRedate", // 复习的日期节点
  NoReview = "bricksnoreview", // 没活
  NoReviewDesc = "工头让你去上面那个工地,过几天再回来",
  TodaySubmit = "brickstodaysubmit",
  DIY = "bricksdiy",
  NotSignIn = "notsignin" // 没登录
}

// 类型默认天数
export enum BricksType {
  TYPE_0 = 1,
  TYPE_1 = 2,
  TYPE_2 = 4,
  TYPE_3 = 7,
  TYPE_4 = 14,
  TYPE_5 = 28,
  TYPE_6 = 60,
}

export enum BricksTypeName {
  TYPE_0 = "不再出现",
  TYPE_1 = "14天",
  TYPE_2 = "7天",
  TYPE_3 = "5天",
  TYPE_4 = "3天",
  TYPE_5 = "2天",
  TYPE_6 = "1天",
}

export enum Category {
  All = "All",
  Difficulty = "Difficulty",
  Tag = "Tag",
  Company = "Company",
  Favorite = "Favorite",
  Score = "Score",
  Choice = "Choice",
  Contest = "Contest",
  RecentContestList = "RecentContestList",
}

export enum DescriptionConfiguration {
  InWebView = "In Webview",
  InFileComment = "In File Comment",
  Both = "Both",
  None = "None",
}

export const leetcodeHasInited: string = "leetcode.hasInited";

export enum SortingStrategy {
  None = "None",
  AcceptanceRateAsc = "Acceptance Rate (Ascending)",
  AcceptanceRateDesc = "Acceptance Rate (Descending)",
  FrequencyAsc = "Frequency (Ascending)",
  FrequencyDesc = "Frequency (Descending)",
  ScoreAsc = "Score (Ascending)",
  ScoreDesc = "Score (Descending)",
  IDDesc = "ID (Descending)",
}

export const SORT_ORDER: SortingStrategy[] = [
  SortingStrategy.None,
  SortingStrategy.AcceptanceRateAsc,
  SortingStrategy.AcceptanceRateDesc,
  SortingStrategy.ScoreAsc,
  SortingStrategy.ScoreDesc,
  SortingStrategy.IDDesc,
];

export enum SearchSetType {
  ScoreRange = "ScoreRange",
  Context = "Context",
  Day = "Day",
}

export enum SearchSetTypeName {
  ScoreRange = "分数范围:",
  Context = "周赛期数:",
  Day = "每日一题",
}

export interface ISearchSet {
  value: string;
  type: SearchSetType;
  time: number; // 时间戳
  todayData: ITodayData | undefined;
}

export const SearchNode: ISearchSet = {
  value: "",
  type: SearchSetType.ScoreRange,
  time: 0,
  todayData: undefined,
};

export interface userContestRanKingBase {
  attendedContestsCount: number; // 参与次数
  rating: number; // 分数
  globalRanking: number; // 全球名次
  localRanking: number; // 本地名次
  globalTotalParticipants: number; //全球所有
  localTotalParticipants: number; // 本地所有
  topPercentage: number; // 位次百分比
}

export const userContestRankingObj: userContestRanKingBase = {
  attendedContestsCount: 0,
  rating: 1500,
  globalRanking: 0,
  localRanking: 0,
  globalTotalParticipants: 0,
  localTotalParticipants: 0,
  topPercentage: 0,
};

export interface ISubmitEvent {
  fid: string;
  qid: string;
  id: string;
  sub_type: string; // test  submit
  accepted: boolean;
}

export class RemarkComment implements Comment {
  id: number;
  label: string | undefined;
  mode: CommentMode;
  author: CommentAuthorInformation;
  contextValue?: string;

  constructor(public body: string | MarkdownString, public parent?: CommentThread) {
    this.id = getDayNowM();
    this.label = "";
    this.contextValue = "canDelete";
    this.mode = CommentMode.Preview;
    this.author = { name: getRemakeName() };
  }

  getDbData() {
    let a = {
      name: this.author.name,
      id: this.id,
      body: this.body,
    };
    return a;
  }

  static getObjByDbData(dbData, thread?): RemarkComment {
    let obj = new RemarkComment(dbData.body, thread);
    obj.id = dbData.id || getDayNowM();
    obj.author = { name: dbData.name };
    return obj;
  }
}

export interface IWebViewOption {
  title: string;
  viewColumn: ViewColumn;
  preserveFocus?: boolean;
}

export enum OpenOption {
  justOpenFile = "仅打开问题文件",
  openInCurrentWindow = "在当前VsCode窗口打开",
  openInNewWindow = "在新的VsCode窗口打开",
  addToWorkspace = "添加到工作空间",
}

export enum OutPutType {
  info = "info",
  warning = "warning",
  error = "error",
}

export const MessageItemObj: MessageItem = {
  title: "",
  isCloseAffordance: false,
};

export const DialogOptions = {
  open: Object.assign({}, MessageItemObj, { title: "Open" }),
  yes: Object.assign({}, MessageItemObj, { title: "Yes" }),
  no: Object.assign({}, MessageItemObj, {
    title: "No",
    isCloseAffordance: true,
  }),
  never: Object.assign({}, MessageItemObj, { title: "Never" }),
  singUp: Object.assign({}, MessageItemObj, { title: "Sign up" }),
};
