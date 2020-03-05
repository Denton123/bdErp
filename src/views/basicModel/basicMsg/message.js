/*
 * @Description: 一级模块数据
 * @Author: sdt
 * @Date: 2019-07-10 11:05:55
 * @LastEditTime: 2020-01-09 16:38:13
 * @LastEditors: Please set LastEditors
 */
import createPurchaseForm from '@/components/public/basicpublic/createPurchaseForm'
import toDetail from '@/components/public/basicpublic/toDetail'
import exportCSVBtn from '@/components/public/basicpublic/exportCSVBtn'
import exportBtn from '@/components/public/basicpublic/exportBtn'
import adjustInventoryBtn from '@/components/public/basicpublic/adjustInventoryBtn'
import addmaterielBtn from '@/components/public/detailpublic/addmaterielBtn'
import submitBtn from '@/components/public/detailpublic/submitBtn'
import newModalBtn from '@/components/public/basicpublic/newModalBtn'
import batchAddBtn from '@/components/public/basicpublic/batchAddBtn'
import importCSVBtn from '@/components/public/basicpublic/importCSVBtn'
export default {
    // 低于安全库存列表
    dangerLine: {
        tab: '低于安全库存列表',
        key: 'dangerLine',
        getUrl: 'materiel/getInvLowList',
        prevKey: 'purchase',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '库存数量', '安全库存', '参考单价（元）', '储存地点'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 100, 100],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'safeTotal', 'price', 'stoPos'],
        // sorter: ['goodsNo'],
        tableOperation: {
            rowSelection: true,
        },
        searchComponent: [{
                type: 'text',
                placeholder: '物料名称',
                name: 'matName'
            },
            {
                type: 'text',
                placeholder: '厂家',
                name: 'factory'
            },
            {
                type: 'text',
                placeholder: '货号',
                name: 'goodsNo'
            }
        ],
        typeComponent: [{
            component: createPurchaseForm,
        }]
    },
    // 采购申请表
    application: {
        key: 'application',
        tab: '采购申请表',
        prevKey: 'material',
        getUrl: 'materiel/getPurchaseList',
        theads: ['序号', '申请单号', '申请日期', '申请人', '审核状态', '操作'],
        props: ['serial', 'purOrdNo', 'reqTime', 'name', 'status', 'operate'],
        // width: [50, 110, 100, 100, 100, 650],
        width: [100, 400, 350, 350, 283, 200],
        fixed: [null, null, null, null, null, 'right'],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看详情',
                action: 'detail'
            }, {
                title: '删除',
                action: 'delete'
            }, {
                title: '修改',
                action: 'modify'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '申请人',
                name: 'reqName'
            },
            {
                type: 'dateRange',
                name: 'date',
                placeholder: ['申请开始日期', '申请结束日期']
            }
        ],
        typeComponent: [{
            component: toDetail,
            params: {
                title: '生成采购申请单',
                prevKey: 'purchase',
                key: 'applicationAdd'
            }
        }]
    },
    uncheckApplication: {
        key: 'uncheckApplication',
        tab: '待审核采购申请表',
        prevKey: 'purchase',
        getUrl: 'materiel/getRevPurList',
        theads: ['序号', '申请单号', '申请日期', '申请人', '审核状态', '操作'],
        props: ['serial', 'purOrdNo', 'reqTime', 'name', 'status', 'operate'],
        width: [100, 350, 300, 333, 250, 350],
        fixed: [null, null, null, null, null, 'right'],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看详情',
                action: 'detail'
            }, {
                title: '撤回',
                action: 'revoke'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '申请人',
                name: 'reqName'
            },
            {
                type: 'dateRange',
                name: 'date',
                placeholder: ['申请开始日期', '申请结束日期']
            }
        ]
    },
    checkedApplication: {
        key: 'checkedApplication',
        tab: '已审核采购申请表',
        prevKey: 'purchase',
        getUrl: 'materiel/getRevedPurList',
        theads: ['序号', '申请单号', '申请日期', '申请人', '审核状态', '操作'],
        props: ['serial', 'purOrdNo', 'reqTime', 'name', 'status', 'operate'],
        width: [100, 380, 380, 380, 318, 120],
        fixed: [null, null, null, null, null, 'right'],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看详情',
                action: 'detail'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '申请人',
                name: 'reqName'
            },
            {
                type: 'dateRange',
                name: 'date',
                placeholder: ['申请开始日期', '申请结束日期']
            }
        ]
    },
    in: {
        key: 'in',
        tab: '入库',
        prevKey: 'inventory',
        getUrl: 'inventory/getInvInOrderList',
        exportUrl: 'inventory/exportInvInOrder',
        theads: ['序号', '入库验收单号', '订单编号', '供应商', '到货日期', '验收人', '验收日期', '入库人', '入库日期', '操作'],
        props: ['serial', 'invInOrdNo', 'orderNo', 'supplier', 'arrTime', 'acptName', 'acptTime', 'invName', 'invInTime', 'operate'],
        width: [70, 200, 200, 200, 200, 150, 150, 150, 200, 163],
        fixed: [null, null, null, null, null, null, null, null, null, 'right'],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看详情',
                action: 'detail'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '供应商',
                name: 'supplier'
            },
            {
                type: 'dateRange',
                name: 'date',
                placeholder: ['入库开始时间', '入库结束时间']
            }
        ],
        typeComponent: [{
                component: toDetail,
                params: {
                    title: '新建入库单',
                    prevKey: 'inventory',
                    key: 'inAdd'
                }
            },
            {
                component: exportBtn,
            }
        ],
        exportComponent: [{
                type: 'dateArr',
                name: 'matName',
                label: '入库时间',
                placeholder: '请选择入库时间'
            },
            {
                type: 'input',
                name: 'goodsNo',
                label: '入库数',
                placeholder: '请输入入库数'
            },
            {
                type: 'input',
                name: 'factory',
                label: '出库数',
                placeholder: '请输入出库数'
            },
        ]
    },
    out: {
        key: 'out',
        tab: '出库',
        prevKey: 'inventory',
        getUrl: 'inventory/getInvOutOrderList',
        exportUrl: 'inventory/exportInvOutOrder',
        theads: ['序号', '出库单号', '领用部门', '用途', '领用日期', '领用人姓名', '申请日期', '仓库管理员', '出库日期', '操作'],
        props: ['serial', 'invOutOrdNo', 'dept', 'instru', 'useTime', 'useName', 'reqTime', 'invName', 'invOutTime', 'operate'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看详情',
                action: 'detail'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '领用人',
                name: 'useName'
            },
            {
                type: 'dateRange',
                name: 'date',
                placeholder: ['申请开始日期', '申请结束日期']
            }
        ],
        typeComponent: [{
            component: toDetail,
            params: {
                title: '新建出库单',
                prevKey: 'inventory',
                key: 'outAdd'
            }
        }, {
            component: exportBtn,
        }],
        exportComponent: [{
                type: 'dateArr',
                name: 'matName',
                label: '时间',
                placeholder: '请选择时间'
            },
            {
                type: 'input',
                name: 'goodsNo',
                label: '出库数',
                placeholder: '请输入出库数'
            },
            {
                type: 'input',
                name: 'factory',
                label: '库存数',
                placeholder: '请输入库存数'
            },
        ]
    },
    list: {
        key: 'list',
        tab: '库存主数据',
        prevKey: 'inventoryManager',
        getUrl: 'inventory/getInvList',
        exportUrl: 'inventory/exportInstChk',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '物料批号', '库存数量', '单位', '储存地点', '储存条件'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'matBatNo', 'total', 'unit', 'stoLoc', 'stoCond'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false
        },
        searchComponent: [{
                type: 'text',
                placeholder: '物料名称',
                name: 'matName'
            },
            {
                type: 'text',
                placeholder: '货号',
                name: 'goodsNo'
            },
            {
                type: 'text',
                placeholder: '厂家',
                name: 'factory'
            },
        ],
        typeComponent: [{
            component: exportCSVBtn,
        }],
        exportComponent: [{
                type: 'input',
                name: 'matName',
                label: '物料名称',
                placeholder: '请输入物料名称'
            },
            {
                type: 'input',
                name: 'goodsNo',
                label: '货号',
                placeholder: '请输入货号'
            },
            {
                type: 'input',
                name: 'factory',
                label: '厂家',
                placeholder: '请输入厂家'
            },
        ]
    },
    adjust: {
        key: 'adjust',
        tab: '库存调整',
        prevKey: 'inventoryManager',
        getUrl: 'inventory/getInvList',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '物料批号', '库存数量', '单位', '储存地点', '储存条件', '操作记录'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'matBatNo', 'total', 'unit', 'stoLoc', 'stoCond', 'operate'],
        width: [70, 100, 150, 150, 150, 150, 150, 150, 101, 150, 150, 150],
        fixed: [null, null, null, null, null, null, null, null, null, null, null, 'right'],
        tableOperation: {
            rowSelection: true,
            operates: [{
                title: '查看操作记录',
                action: 'detail'
            }]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '物料名称',
                name: 'matName'
            },
            {
                type: 'text',
                placeholder: '厂家',
                name: 'factory'
            },
            {
                type: 'text',
                placeholder: '货号',
                name: 'goodsNo'
            },
        ],
        typeComponent: [{
            component: adjustInventoryBtn,
        }]
    },
    instrumentlist: {
        key: 'instrumentlist',
        tab: '仪器主数据',
        isCancel: true,
        prevKey: 'instrument',
        exportUrl: 'inst/exportInst',
        getUrl: 'inst/getInstList',
        theads: ['序号', '分类', '仪器设备名称', '仪器设备编号', '状态', '序列号', '厂家', '规格型号', '单位', '校准周期(天)', '到货日期', '启用日期', '使用年限', '单价', '固定资产编号', '安装地点', '操作'],
        props: ['serial', 'catalog', 'instName', 'devNo', 'status', 'serialNo', 'factory', 'spec', 'unit', 'calCycle', 'arrTime', 'startTime', 'yearLimit', 'price', 'fixAssNo', 'instLoc', 'operate'],
        fixed: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'right'],
        width: [70, 80, 160, 100, 120, 100, 100, 100, 100, 100, 120, 100, 90, 100, 120, 100, 150],
        required: [{
                name: 'instNameTitle',
                title: '仪器设备名称'
            }, {
                name: 'devNoTitle',
                title: '仪器设备编号'
            },
            {
                name: 'statusTitle',
                title: '状态'
            },
            {
                name: 'arrTimeTitle',
                title: '到货日期'
            },
            {
                name: 'serialNoTitle',
                title: '序列号'
            },
            {
                name: 'startTimeTitle',
                title: '启用日期'
            },
            {
                name: 'priceTitle',
                title: '单价'
            },
            {
                name: 'instLocTitle',
                title: '安装地点'
            },
            {
                name: 'fixAssNoTitle',
                title: '固定资产编号'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '操作记录',
                action: 'detail'
            }, {
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }],
            slotCols: [{
                    key: 'instName',
                    editType: 'select',
                    editOpts: [],
                    editable: true,
                    required: true,
                    isHandleChange: true,
                    isDefault: true,
                    defaultUrl: 'inst/getAllInstBaseNameList',
                    changeUrl: 'inst/getInstBaseDetail',
                    placeholder: '请选择仪器设备名称',
                },
                {
                    key: 'devNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入仪器设备编号'
                },
                {
                    key: 'status',
                    editType: 'select',
                    editable: true,
                    required: true,
                    editOpts: [{
                        key: '1',
                        value: '正常'
                    }, {
                        key: '2',
                        value: '待维修'
                    }, {
                        key: '3',
                        value: '报废'
                    }, {
                        key: '4',
                        value: '停用'
                    }],
                    placeholder: '请选择状态',
                    renderType: 'status'
                },
                {
                    key: 'serialNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入序列号'
                },
                {
                    key: 'arrTime',
                    editType: 'date',
                    format: 'YYYY-MM-DD',
                    editable: true,
                    type: 'time',
                    placeholder: '请输入到货日期'
                },
                {
                    key: 'startTime',
                    editType: 'date',
                    format: 'YYYY-MM-DD',
                    editable: true,
                    type: 'time',
                    placeholder: '请输入启用日期',
                    required: true
                },
                {
                    key: 'price',
                    editType: 'inputNum',
                    editable: true,
                    required: true,
                    placeholder: '价格'
                },
                {
                    key: 'instLoc',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '安装地点'
                },
                {
                    key: 'fixAssNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '固定资产编号'
                },
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '仪器设备名称',
                name: 'instName'
            },
            {
                type: 'text',
                placeholder: '编号',
                name: 'devNo'
            },
            {
                type: 'select',
                placeholder: '状态',
                name: 'status',
                options: [{
                    key: '1',
                    value: '正常',
                }, {
                    key: '2',
                    value: '待维修'
                }, {
                    key: '3',
                    value: '报废'
                }, {
                    key: '4',
                    value: '停用'
                }]
            },
        ],
        typeComponent: [{
            component: addmaterielBtn,
            params: {
                title: '新建仪器单'
            }
        }, {
            component: exportCSVBtn,
        }],
        exportComponent: [{
                type: 'input',
                name: 'instName',
                label: '仪器名称',
                placeholder: '请输入仪器名称'
            },
            {
                type: 'input',
                name: 'devNo',
                label: '仪器编号',
                placeholder: '请输入仪器编号'
            },
            {
                type: 'select',
                name: 'status',
                label: '状态',
                options: [{
                    key: '1',
                    value: '正常',
                }, {
                    key: '2',
                    value: '待维修'
                }, {
                    key: '3',
                    value: '报废'
                }, {
                    key: '4',
                    value: '停用'
                }]
            },
        ]
    },
    instrumentplan: {
        key: 'instrumentplan',
        tab: '仪器周期检定计划',
        prevKey: 'instrument',
        getUrl: 'inst/getInstChkList',
        isCancel: true,
        exportUrl: 'inst/exportInstChk',
        theads: ['序号', '分类', '仪器设备名称', '仪器设备编号', '状态', '序列号', '厂家', '规格型号', '单位', '校准周期（天）', '最近一次校准日期', '检定证书编号', '下次校准日期', '校准机构', '安装地点', '操作'],
        props: ['serial', 'catalog', 'instName', 'devNo', 'status', 'serialNo', 'factory', 'spec', 'unit', 'calCycle', 'recCalTime', 'certNo', 'nextCalTime', 'calMech', 'instLoc', 'operate'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 120, 115, 103, 105, 100, 100, 180],
        fixed: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
                name: 'recCalTimeTitle',
                title: '最近一次校准日期'
            },
            {
                name: 'nextCalTimeTitle',
                title: '下次校准日期'
            },
            {
                name: 'certNoTitle',
                title: '检定证书编号'
            },
            {
                name: 'calMechTitle',
                title: '校准机构'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看操作记录',
                action: 'detail'
            }, {
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }],
            slotCols: [
                // {
                //     key: 'instName',
                //     editType: 'select',
                //     editOpts: [],
                //     editable: true,
                //     required: true,
                //     isHandleChange: true,
                //     isDefault: true,
                //     defaultUrl: 'inst/getAllInstBaseNameList',
                //     changeUrl: 'inst/getInstBaseDetail',
                //     placeholder: '请选择仪器设备名称'
                // }, 
                {
                    key: 'recCalTime',
                    editType: 'date',
                    format: 'YYYY-MM-DD',
                    placeholder: '请选择最近一次校准日期',
                    editable: true,
                    required: true,
                    type: 'time',
                    isChange: true
                },
                {
                    key: 'nextCalTime',
                    editType: 'date',
                    format: 'YYYY-MM-DD',
                    placeholder: '请选择下次校准日期',
                    editable: true,
                    required: true,
                    type: 'time'
                },
                {
                    key: 'certNo',
                    editType: 'input',
                    placeholder: '请输入检定证书编号',
                    editable: true,
                    required: true
                },
                {
                    key: 'calMech',
                    editType: 'input',
                    placeholder: '请输入校准机构',
                    editable: true,
                    required: true
                },
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '仪器名称',
                name: 'instName'
            },
            {
                type: 'text',
                placeholder: '仪器编号',
                name: 'devNo'
            },
            // {
            //     type: 'select',
            //     placeholder: '状态',
            //     name: 'status',
            //     options: [{
            //         key: '1',
            //         value: '正常',
            //     }, {
            //         key: '2',
            //         value: '待维修'
            //     }, {
            //         key: '3',
            //         value: '报废'
            //     }, {
            //         key: '4',
            //         value: '停用'
            //     }]
            // },
        ],
        typeComponent: [{
            component: exportCSVBtn,
        }],
        exportComponent: [{
                type: 'input',
                name: 'instName',
                label: '仪器名称',
                placeholder: '请输入仪器名称'
            },
            {
                type: 'input',
                name: 'devNo',
                label: '仪器编号',
                placeholder: '请输入仪器编号'
            },
            {
                type: 'select',
                name: 'status',
                label: '状态',
                options: [{
                    key: '1',
                    value: '正常',
                }, {
                    key: '2',
                    value: '待维修'
                }, {
                    key: '3',
                    value: '报废'
                }, {
                    key: '4',
                    value: '停用'
                }]
            },
        ]
    },
    instrumentadjust: {
        key: 'instrumentadjust',
        tab: '仪器调整',
        prevKey: 'instrument',
        isCancel: true,
        getUrl: 'inst/getAdjInstList',
        theads: ['序号', '仪器设备名称', '仪器设备编号', '原本状态', '状态调整', '原本位置', '位置调整', '调整时间', '调整原因', '申请人', '操作'],
        props: ['serial', 'instName', 'devNo', 'status', 'adjStatus', 'instLoc', 'adjLoc', 'adjTime', 'adjReason', 'reqName', 'operate'],
        width: [70, 200, 200, 150, 150, 150, 150, 150, 150, 103, 210],
        fixed: [null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
                name: 'adjStatusTitle',
                title: '状态调整'
            },
            {
                name: 'adjLocTitle',
                title: '位置调整'
            },
            {
                name: 'adjTimeTitle',
                title: '调整时间'
            },
            {
                name: 'adjReasonTitle',
                title: '调整原因'
            },
            {
                name: 'reqNameTitle',
                title: '申请人'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '查看操作记录',
                action: 'detail'
            }, {
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }],
            slotCols: [{
                    key: 'adjStatus',
                    editType: 'select',
                    editOpts: [{
                        key: '1',
                        value: '正常',
                    }, {
                        key: '2',
                        value: '待维修'
                    }, {
                        key: '3',
                        value: '报废'
                    }, {
                        key: '4',
                        value: '停用'
                    }],
                    editable: true,
                    required: true,
                    placeholder: '状态调整',
                    renderType: 'status'
                },
                {
                    key: 'adjLoc',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入位置调整'
                },
                {
                    key: 'adjTime',
                    editType: 'date',
                    format: 'YYYY-MM-DD',
                    placeholder: '请选择调整日期',
                    editable: true,
                    required: true,
                    type: 'time'
                },
                {
                    key: 'adjReason',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入调整原因'
                },
                {
                    key: 'reqName',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入申请人'
                },
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '仪器名称',
                name: 'instName'
            },
            {
                type: 'text',
                placeholder: '仪器编号',
                name: 'devNo'
            },
            {
                type: 'select',
                placeholder: '状态',
                name: 'status',
                options: [{
                    key: '1',
                    value: '正常',
                }, {
                    key: '2',
                    value: '待维修'
                }, {
                    key: '3',
                    value: '报废'
                }, {
                    key: '4',
                    value: '停用'
                }]
            },
            {
                type: 'date',
                name: 'adjTime',
                placeholder: '调整时间'
            }
        ],
    },
    reagent: {
        key: 'reagent',
        tab: '物料',
        prevKey: 'usable',
        isCancel: true,
        getUrl: 'baseinfo/getMatList',
        exportUrl: 'baseinfo/exportMat',
        importUrl: '/baseinfo/importMat',
        downloadUrl: 'baseinfo/exportMatTpl',
        theads: ['序号', '编号', '货号', '状态', '物料名称', '厂家', '规格', '单位', '安全库存', '单价（元）', '储存条件', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'status', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'stoCond', 'operate'],
        width: [70, 150, 155, 150, 158, 120, 130, 150, 150, 150, 150, 150],
        fixed: [null, null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
                name: 'matNoTitle',
                title: '编号'
            },
            {
                name: 'goodsNoTitle',
                title: '货号'
            },
            {
                name: 'statusTitle',
                title: '状态'
            },
            {
                name: 'matNameTitle',
                title: '物料名称'
            },
            {
                name: 'factoryTitle',
                title: '厂家'
            },
            {
                name: 'specTitle',
                title: '规格'
            },
            {
                name: 'unitTitle',
                title: '单位'
            },
            {
                name: 'stoCondTitle',
                title: '存储条件'
            },
            {
                name: 'totalTitle',
                title: '安全库存'
            },
            {
                name: 'priceTitle',
                title: '单价（元）'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, ],
            slotCols: [{
                    key: 'matNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入编号'
                },
                {
                    key: 'status',
                    editType: 'select',
                    editOpts: [{
                        key: '1',
                        value: '启用',
                    }, {
                        key: '2',
                        value: '禁用'
                    }],
                    editable: true,
                    required: true,
                    placeholder: '请选择状态调整',
                    renderType: 'status'
                },
                {
                    key: 'goodsNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入货号'
                },
                {
                    key: 'matName',
                    editType: 'input',
                    editable: true,
                    required: true,
                    // editOpts: [{
                    //     value: 'AAA',
                    //     key: 1
                    // }, {
                    //     value: 'BBB',
                    //     key: 2
                    // }],
                    // editable: true,
                    // required: true,
                    // isDefault: true,
                    // isHandleChange: true,
                    // defaultUrl: 'common/getAllMatNameList',
                    // changeUrl: 'common/getMatDetail',
                    placeholder: '请选择物料名称'
                }, {
                    key: 'factory',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入厂家'
                },
                {
                    key: 'spec',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入规格型号'
                },
                {
                    key: 'unit',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入单位'
                },
                {
                    key: 'total',
                    editType: 'inputNum',
                    editable: true,
                    required: true,
                    placeholder: '请输入数量'
                },
                {
                    key: 'price',
                    editType: 'inputAfter',
                    editable: true,
                    required: true,
                    placeholder: '请输入价格'
                },
                {
                    key: 'stoCond',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入储存地点'
                },
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '物料名称',
                name: 'matName'
            },
            {
                type: 'text',
                placeholder: '货号',
                name: 'goodsNo'
            },
            {
                type: 'text',
                placeholder: '厂家',
                name: 'factory'
            }
        ],
        typeComponent: [{
            component: batchAddBtn,
            params: {
                prevKey: 'usable',
                key: 'reagentBatchAdd'
            }
        }, {
            component: exportCSVBtn,
        }, {
            component: importCSVBtn,
        }],
        exportComponent: [{
                type: 'input',
                name: 'matName',
                label: '物料名称',
                placeholder: '请输入物料名称'
            },
            {
                type: 'input',
                name: 'factory',
                label: '厂家',
                placeholder: '请输入厂家'
            },
            {
                type: 'input',
                name: 'goodsNo',
                label: '货号',
                placeholder: '请输入货号'
            },
        ]
    },
    instrument: {
        key: 'instrument',
        tab: '仪器',
        prevKey: 'usable',
        isCancel: true,
        getUrl: 'baseinfo/getInstList',
        importUrl: '/baseinfo/importInst',
        exportUrl: 'baseinfo/exportInst',
        downloadUrl: 'baseinfo/exportInstTpl',
        theads: ['序号', '分类', '状态', '仪器设备名称', '厂家', '规格型号', '单位', '校准周期（天）', '使用年限（年）', '单价（元）', '操作'],
        props: ['serial', 'catalog', 'status', 'instName', 'factory', 'spec', 'unit', 'calCycle', 'yearLimit', 'price', 'operate'],
        width: [70, 180, 180, 198, 155, 150, 150, 150, 150, 150, 150],
        fixed: [null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
                name: 'catalogTitle',
                title: '分类'
            },
            {
                name: 'instNameTitle',
                title: '仪器名称'
            },
            {
                name: 'factoryTitle',
                title: '厂家'
            },
            {
                name: 'statusTitle',
                title: '状态'
            },
            {
                name: 'specTitle',
                title: '规格型号'
            },
            {
                name: 'unitTitle',
                title: '单位'
            },
            {
                name: 'calCycleTitle',
                title: '校准周期（天）'
            },
            {
                name: 'priceTitle',
                title: '单价（元）'
            }
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                    title: '编辑',
                    editSubmitTitle: '确认',
                    editCancelTitle: '取消',
                    action: 'edit'
                },
                // {
                //     title: '启用',
                //     action: 'switch'
                // }
            ],
            slotCols: [{
                    key: 'catalog',
                    editType: 'input',
                    required: true,
                    editable: true,
                    placeholder: '请输入分类'
                },
                {
                    key: 'instName',
                    editType: 'input',
                    required: true,
                    editable: true,
                    // editOpts: [{
                    //     value: 'AAA',
                    //     key: 1
                    // }, {
                    //     value: 'BBB',
                    //     key: 2
                    // }],
                    // editable: true,
                    // required: true,
                    // isHandleChange: true,
                    // isDefault: true,
                    // defaultUrl: 'inst/getAllInstBaseNameList',
                    // changeUrl: 'inst/getInstBaseDetail',
                    placeholder: '请输入规格型号'
                },
                {
                    key: 'status',
                    editType: 'select',
                    editOpts: [{
                        key: '1',
                        value: '启用',
                    }, {
                        key: '2',
                        value: '禁用'
                    }],
                    editable: true,
                    required: true,
                    placeholder: '请选择状态调整',
                    renderType: 'status'
                },
                {
                    key: 'factory',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入厂家'
                },
                {
                    key: 'spec',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入规格型号'
                },
                {
                    key: 'unit',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入单位'
                },
                {
                    key: 'calCycle',
                    editType: 'inputAfter',
                    editable: true,
                    required: true,
                    placeholder: '请输入校准周期'
                },
                {
                    key: 'yearLimit',
                    editType: 'inputAfter',
                    editable: true,
                    placeholder: '请输入使用年限'
                },
                {
                    key: 'price',
                    editType: 'inputAfter',
                    editable: true,
                    required: true,
                    placeholder: '请输入价格'
                },
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '仪器名称',
                name: 'instName'
            },
            {
                type: 'text',
                placeholder: '厂家',
                name: 'factory'
            },
            {
                type: 'select',
                placeholder: '状态',
                name: 'status',
                options: [{
                    key: '1',
                    value: '启用',
                }, {
                    key: '2',
                    value: '禁用'
                }]
            },
        ],
        typeComponent: [{
            component: batchAddBtn,
            params: {
                prevKey: 'usable',
                key: 'instrumentBatchAdd'
            }
        }, {
            component: exportCSVBtn,
        }, {
            component: importCSVBtn,
        }],
        exportComponent: [{
                type: 'input',
                name: 'instName',
                label: '仪器名称',
                placeholder: '请输入仪器名称'
            },
            {
                type: 'input',
                name: 'factory',
                label: '厂家',
                placeholder: '请输入厂家'
            },
            {
                type: 'select',
                name: 'status',
                label: '状态',
                options: [{
                    key: '1',
                    value: '启用',
                }, {
                    key: '2',
                    value: '禁用'
                }]
            },
        ]
    },
}