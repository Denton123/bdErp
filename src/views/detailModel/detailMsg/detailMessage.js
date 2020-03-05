/*
 * @Description: 详情模块数据
 * @Author: sdt
 * @Date: 2019-07-12 14:14:54
 * @LastEditTime: 2020-01-09 14:09:58
 * @LastEditors: Please set LastEditors
 */

import addmaterielBtn from '@/components/public/detailpublic/addmaterielBtn'
import submitBtn from '@/components/public/detailpublic/submitBtn'
import saveBtn from '@/components/public/detailpublic/saveBtn'
import printBtn from '@/components/public/detailpublic/printBtn'
import batchSubtn from '@/components/public/detailpublic/batchSubtn'

export default {
    applicationDetail: {
        tab: '采购申请单',
        key: 'applicationDetail',
        prevKey: 'purchase',
        getUrl: 'materiel/detail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '请购数量', '单价（元）'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入请购部门',
                label: '请购部门',
                name: 'dept',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入请购部门!'
                }],
            },
            {
                type: 'text',
                placeholder: '请输入组别',
                label: '组别',
                name: 'group',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入组别!'
                }],
            }, {
                type: 'date',
                placeholder: '请选择请购日期',
                label: '请购日期',
                name: 'reqTime',
                // width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择请购日期!'
                }],
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入用途!'
                }],
            }, {
                type: 'date',
                placeholder: '请选择需求时间',
                label: '需求时间',
                name: 'demTime',
                // width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择需求时间!'
                }],
            }, {
                type: 'text',
                placeholder: '请输入申请人姓名',
                label: '申请人姓名',
                name: 'reqName',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入申请人!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择下单时间',
                label: '下单时间',
                name: 'createTime',
                // width: '200',
                format: 'YYYY-MM-DD HH:MM',
            }, {
                type: 'text',
                placeholder: '请输入总计金额',
                label: '总计金额',
                name: 'amount',
                // width: '200',
                isDisabled: true
            }, {
                type: 'text',
                // placeholder: '请选择审核人姓名',
                label: '审核人姓名',
                name: 'revName',
                // width: '200',
                isDisabled: true
            }, {
                type: 'date',
                // placeholder: '请选择审核时间',
                label: '审核时间',
                name: 'revTime',
                // width: '200',
                format: 'YYYY-MM-DD HH:MM',
                isDisabled: true
            }, {
                type: 'text',
                // placeholder: '请输入审核意见',
                label: '审核意见',
                name: 'revOpin',
                // width: '811',,
                isDisabled: true
            },
        ],
        typeComponent: [{
            component: printBtn,
        }, ]
    },
    applicationAdd: {
        tab: '采购申请单',
        key: 'applicationAdd',
        cancel: false,
        isCancel: true,
        prevKey: 'purchase',
        getUrl: 'materiel/getMaterielList',
        submitUrl: 'materiel/generateRev',
        saveUrl: 'materiel/generate',
        savetoUrl: '/erp/purchase/application',
        submitoUrl: '/erp/purchase/uncheckApplication',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '请购数量', '单价（元）', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'operate'],
        // width: [50, 80, 80, 100, 80, 80, 80, 100, 100, 100],
        fixed: [null, null, null, null, null, null, null, null, null, 'right'],
        width: [130, 180, 180, 200, 160, 180, 180, 150, 180, 150],
        required: [{
                name: 'matNameTitle',
                title: '物料名称'
            },
            {
                name: 'totalTitle',
                title: '请购数量'
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
                },
                {
                    title: '删除',
                    action: 'deleteRow'
                }
            ],
            slotCols: [{
                    key: 'matName',
                    editType: 'select',
                    editOpts: [
                        //     {
                        //     value: 'AAA',
                        //     key: 1
                        // }, {
                        //     value: 'BBB',
                        //     key: 2
                        // }
                    ],
                    editable: true,
                    required: true,
                    isDefault: true,
                    isHandleChange: true,
                    defaultUrl: 'common/getAllMatNameList',
                    changeUrl: 'common/getMatDetail',
                    placeholder: '请选择物料名称'
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
            ]
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入请购部门',
                label: '请购部门',
                name: 'dept',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入请购部门!'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入组别',
                label: '组别',
                name: 'group',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入组别!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择请购日期',
                label: '请购日期',
                name: 'reqTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择请购日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入用途!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入申请人姓名',
                label: '申请人姓名',
                name: 'reqName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入申请人姓名!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择需求时间',
                label: '需求时间',
                name: 'demTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择需求时间!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入总计金额',
                label: '总计金额',
                name: 'amount',
                width: '200',
                isDisabled: true
            }
        ],
        typeComponent: [{
                component: addmaterielBtn,
            },
            {
                component: saveBtn
            },
            {
                component: submitBtn,
                params: {
                    title: '申请单'
                }
            }
        ]
    },
    applicationModify: {
        tab: '采购申请单',
        key: 'applicationModify',
        prevKey: 'purchase',
        getUrl: 'materiel/detail',
        isCancel: true,
        submitoUrl: '/erp/purchase/uncheckApplication',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '请购数量', '单价（元）', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'operate'],
        width: [70, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'delete'
            }],
            slotCols: [{
                    key: 'matName',
                    editType: 'select',
                    editOpts: [{
                        value: 'AAA',
                        key: 1
                    }, {
                        value: 'BBB',
                        key: 2
                    }],
                    editable: true,
                    required: true,
                    isHandleChange: true,
                    isDefault: true,
                    defaultUrl: 'common/getAllMatNameList',
                    changeUrl: 'common/getMatDetail',
                    placeholder: '请选择物料名称'
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
            ]
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入请购部门',
                label: '请购部门',
                name: 'dept',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入请购部门!'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入组别',
                label: '组别',
                name: 'group',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入组别!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择请购日期',
                label: '请购日期',
                name: 'reqTime',
                // width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择请购日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入申请人',
                label: '申请人',
                name: 'reqName',
                // width: '200',
                rules: [{
                    required: true,
                    message: '请输入申请人!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                // width: '200',/
                rules: [{
                    required: true,
                    message: '请输入用途!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择需求时间',
                label: '需求时间',
                name: 'demTime',
                // width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择需求时间!'
                }],
            }, {
                type: 'text',
                // placeholder: '请选择审核人姓名',
                label: '审核人姓名',
                name: 'revName',
                // width: '200',
                isDisabled: true
            }, {
                type: 'date',
                // placeholder: '请选择审核时间',
                label: '审核时间',
                name: 'revTime',
                // width: '200',
                format: 'YYYY-MM-DD HH:MM',
                isDisabled: true
            }, {
                type: 'text',
                // placeholder: '请输入审核意见',
                label: '审核意见',
                name: 'revOpin',
                // width: '811',,
                isDisabled: true
            }, {
                type: 'text',
                placeholder: '请输入总计金额',
                label: '总计金额',
                name: 'amount',
                // width: '200'
                isDisabled: true
            }
        ],
        typeComponent: [{
                component: addmaterielBtn,
            },
            {
                component: saveBtn
            },
            {
                component: submitBtn,
                params: {
                    title: '申请单'
                }
            }
        ]
    },
    uncheckApplicationDetail: {
        tab: '待审核采购申请单',
        key: 'uncheckApplicationDetail',
        prevKey: 'purchase',
        getUrl: 'materiel/detail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '请购数量', '单价（元）'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        },
        // searchComponent: [{
        //         type: 'text',
        //         placeholder: '编号',
        //         name: 'reaNo'
        //     },
        //     {
        //         type: 'text',
        //         placeholder: '货号',
        //         name: 'goodsNo'
        //     },
        //     {
        //         type: 'text',
        //         placeholder: '物料名称',
        //         name: 'matName'
        //     }
        // ],
        submitComponent: [{
                type: 'text',
                placeholder: '请输入请购部门',
                label: '请购部门',
                name: 'dept',
                width: '200'
            },
            {
                type: 'text',
                placeholder: '请输入组别',
                label: '组别',
                name: 'group',
                width: '200'
            }, {
                type: 'date',
                placeholder: '请选择请购日期',
                label: '请购日期',
                name: 'reqTime',
                width: '200',
                format: 'YYYY-MM-DD'
            }, {
                type: 'text',
                placeholder: '请输入申请人',
                label: '申请人',
                name: 'reqName',
                width: '200'
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                width: '200'
            }, {
                type: 'date',
                placeholder: '请选择需求时间',
                label: '需求时间',
                name: 'demTime',
                width: '200',
                format: 'YYYY-MM-DD'
            }, {
                type: 'text',
                placeholder: '请输入总计金额',
                label: '总计金额',
                name: 'amount',
                width: '200',
                isDisabled: true
            }
        ],
    },
    checkedApplicationDetail: {
        tab: '已审核采购申请单',
        key: 'checkedApplicationDetail',
        prevKey: 'purchase',
        getUrl: 'materiel/detail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '请购数量', '单价（元）'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入请购部门',
                label: '请购部门',
                name: 'dept',
                width: '200'
            },
            {
                type: 'text',
                placeholder: '请输入组别',
                label: '组别',
                name: 'group',
                width: '200'
            }, {
                type: 'date',
                placeholder: '请选择请购日期',
                label: '请购日期',
                name: 'reqTime',
                width: '200',
                format: 'YYYY-MM-DD'
            }, {
                type: 'text',
                placeholder: '请输入申请人',
                label: '申请人',
                name: 'reqName',
                width: '200'
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                width: '200'
            }, {
                type: 'date',
                placeholder: '请选择需求时间',
                label: '需求时间',
                name: 'demTime',
                width: '200',
                format: 'YYYY-MM-DD'
            }, {
                type: 'text',
                placeholder: '请输入总计金额',
                label: '总计金额',
                name: 'amount',
                width: '200',
                isDisabled: true
            }, {
                type: 'text',
                // placeholder: '请填写审批意见',
                label: '审批意见',
                name: 'revOpin',
                width: '811'
            }, {
                type: 'text',
                // placeholder: '请选择审核人姓名',
                label: '审核人姓名',
                name: 'revName',
                // width: '200',
                isDisabled: true
            }, {
                type: 'date',
                // placeholder: '审核日期',
                label: '审核日期',
                name: 'revTime',
                width: '200',
                format: 'YYYY-MM-DD HH:MM',
                showTime: true
            }
        ],
        // typeComponent: [{
        //     component: printBtn,
        // }]
    },
    inDetail: {
        tab: '入库',
        key: 'inDetail',
        prevKey: 'inventory',
        getUrl: 'inventory/getInOrderDetail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '入库数量', '单价（元）', '物料批号', '有效期', '验收情况', '储存地点', '储存条件', '备注'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'matBatNo', 'validPTime', 'acptStatus', 'stoLoc', 'stoCond', 'remark'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入入库验收单号',
                label: '入库验收单号',
                name: 'invInOrdNo',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入入库验收单号                                                                                                                                                                                      !'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入订单编号',
                label: '订单编号',
                name: 'orderNo',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入订单编号!'
                }]
            }, {
                type: 'text',
                placeholder: '请选择供应商',
                label: '供应商',
                name: 'supplier',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择供应商!'
                }]
            }, {
                type: 'date',
                placeholder: '请输入到货日期',
                label: '到货日期',
                name: 'arrTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请输入到货日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入验收人',
                label: '验收人',
                name: 'acptName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入验收人!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择验收日期',
                label: '验收日期',
                name: 'acptTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择验收日期!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择入库日期',
                label: '入库日期',
                name: 'invInTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择入库日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请填写入库人',
                label: '入库人',
                name: 'invName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请填写入库人!'
                }]
            }
        ],
        typeComponent: [{
            component: printBtn,
        }],
        addComponent: [{
                component: addmaterielBtn,
            },
            {
                component: submitBtn,
                params: {
                    title: '入库单'
                }
            }
        ]

    },
    inAdd: {
        tab: '入库',
        key: 'inAdd',
        prevKey: 'inventory',
        submitUrl: 'inventory/generateInOrder',
        isCancel: true,
        submitoUrl: '/erp/inventory/in',
        fixed: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'right'],
        // getDetilMsgUrl: '/common/getMatDetail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '入库数量', '单价（元）', '物料批号', '有效期', '验收情况', '储存地点', '储存条件', '备注', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'matBatNo', 'validPTime', 'acptStatus', 'stoLoc', 'stoCond', 'remark', 'operate'],
        width: [70, 100, 90, 500, 300, 100, 80, 120, 140, 300, 200, 150, 200, 200, 200, 120],
        required: [{
                name: 'matNameTitle',
                title: '物料名称'
            }, {
                name: 'totalTitle',
                title: '入库数量'
            },
            {
                name: 'priceTitle',
                title: '单价（元）'
            },
            {
                name: 'matBatNoTitle',
                title: '物料批号'
            },
            {
                name: 'validPTimeTitle',
                title: '有效期'
            },
            {
                name: 'acptStatusTitle',
                title: '验收情况'
            },
            {
                name: 'stoLocTitle',
                title: '存储地点'
            },
            {
                name: 'stoCondTitle',
                title: '存储条件'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'deleteRow'
            }],
            slotCols: [{
                    key: 'matName',
                    editType: 'select',
                    editOpts: [],
                    editable: true,
                    required: true,
                    isHandleChange: true,
                    isDefault: true,
                    defaultUrl: 'common/getAllMatNameList',
                    changeUrl: 'common/getMatDetail',
                    numUrl: 'inventory/getMatBatNoList',
                    placeholder: '请选择物料名称'
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
                    key: 'matBatNo',
                    editType: 'input',
                    // editOpts: [],
                    editable: true,
                    required: true,
                    placeholder: '请输入物料批号'
                },
                {
                    key: 'validPTime',
                    editType: 'date',
                    editable: true,
                    required: false,
                    format: 'YYYY-MM-DD',
                    type: 'time',
                    placeholder: '请选择有效期'
                },
                {
                    key: 'acptStatus',
                    editType: 'select',
                    editable: true,
                    required: true,
                    editOpts: [{
                        value: '合格',
                        key: 1
                    }, {
                        value: '不合格',
                        key: 2
                    }],
                    renderType: 'acptStatus',
                    placeholder: '请选择验收情况'
                },
                {
                    key: 'stoLoc',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入储存地点'
                },
                {
                    key: 'stoCond',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入储存条件'
                },
                {
                    key: 'remark',
                    editType: 'input',
                    editable: true,
                    // required: true,
                    placeholder: '请输入备注'
                },
            ]
        },
        submitComponent: [
            // {
            //     type: 'text',
            //     isDisabled: true,
            //     placeholder: '请输入入库验收单号',
            //     label: '入库验收单号',
            //     name: 'invInOrdNo',
            //     width: '200',
            //     rules: [{
            //         required: true,
            //         message: '请输入入库验收单号                                                                                                                                                                                      !'
            //     }]
            // },
            {
                type: 'text',
                placeholder: '请输入订单编号',
                label: '订单编号',
                name: 'orderNo',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入订单编号!'
                }]
            }, {
                type: 'text',
                placeholder: '请选择供应商',
                label: '供应商',
                name: 'supplier',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择供应商!'
                }]
            }, {
                type: 'date',
                placeholder: '请输入到货日期',
                label: '到货日期',
                name: 'arrTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请输入到货日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入验收人姓名',
                label: '验收人',
                name: 'acptName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入验收人姓名!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择验收日期',
                label: '验收日期',
                name: 'acptTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择验收日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请填写入库人',
                label: '入库人',
                name: 'invName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请填写入库人!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择入库日期',
                label: '入库日期',
                name: 'invInTime',
                width: '200',
                format: 'YYYY-MM-DD',
                rules: [{
                    required: true,
                    message: '请选择入库日期!'
                }]
            },
        ],
        typeComponent: [{
            component: printBtn,
        }],
        addComponent: [{
                component: addmaterielBtn,
            },
            {
                component: submitBtn,
                params: {
                    title: '入库单'
                }
            }
        ]

    },
    outDetail: {
        tab: '出库',
        key: 'outDetail',
        prevKey: 'inventory',
        getUrl: 'inventory/getOutOrderDetail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '出库数量', '物料批号', '储存地点', '储存条件', '备注'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'matBatNo', 'stoLoc', 'stoCond', 'remark'],
        width: [70, 80, 110, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        },
        submitComponent: [{
                type: 'text',
                placeholder: '请输入出库单号',
                label: '出库单号',
                name: 'invOutOrdNo',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入出库单号!'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入订单编号',
                label: '订单编号',
                name: 'code',
                width: '200'
            },
            {
                type: 'text',
                placeholder: '请输入领用部门',
                label: '领用部门',
                name: 'dept',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入领用部门!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入用途!'
                }]
            }, {
                type: 'text',
                placeholder: '请输入领用人',
                label: '领用人',
                name: 'useName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入领用人!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择领用日期',
                label: '领用日期',
                name: 'useTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择领用日期!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择申请日期',
                label: '申请日期',
                name: 'reqTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择申请日期!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择出库日期',
                label: '出库日期',
                name: 'invOutTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择出库日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请填写仓库管理员',
                label: '仓库管理员',
                name: 'invName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请填写仓库管理员!'
                }]
            }
        ],
        typeComponent: [{
            component: printBtn,
        }],
        addComponent: [{
                component: addmaterielBtn,
            },
            {
                component: submitBtn,
                params: {
                    title: '出库单'
                }
            }
        ]

    },
    outAdd: {
        tab: '出库',
        key: 'outAdd',
        prevKey: 'inventory',
        submitUrl: 'inventory/generateOutOrder',
        isCancel: true,
        submitoUrl: '/erp/inventory/out',
        // getDetilMsgUrl: '/common/getMatDetail',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '库存数量', '出库数量', '物料批号', '有效期', '储存地点', '储存条件', '备注', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'totalSum', 'outTotal', 'matBatNo', 'outvalidPTime', 'stoLoc', 'stoCond', 'remark', 'operate'],
        width: [70, 100, 100, 500, 300, 80, 140, 180, 120, 200, 100, 100, 100, 120, 100],
        fixed: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
                name: 'matNameTitle',
                title: '物料名称'
            }, {
                name: 'matBatNoTitle',
                title: '物料批号'
            },
            {
                name: 'outTotalTitle',
                title: '出库数量'
            },
        ],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'deleteRow'
            }],
            slotCols: [{
                    key: 'matName',
                    editType: 'select',
                    editOpts: [],
                    editable: true,
                    required: true,
                    isHandleChange: true,
                    isDefault: true,
                    defaultUrl: 'common/getAllMatNameList',
                    changeUrl: 'common/getMatDetail',
                    numUrl: 'inventory/getMatBatNoList',
                    placeholder: '请选择物料名称'
                },
                {
                    key: 'matBatNo',
                    editType: 'select',
                    editable: true,
                    required: true,
                    editOpts: [],
                    placeholder: '请选择物料编号',
                    isGetDetail: true,
                    changeUrl: 'inventory/getInvDetail'
                },
                {
                    key: 'outTotal',
                    editType: 'inputNum',
                    editable: true,
                    required: true,
                    placeholder: '请输入数量'
                },
                {
                    key: 'remark',
                    editType: 'input',
                    editable: true,
                    // required: true,
                    placeholder: '请输入备注'
                },
            ]
        },
        submitComponent: [
            // {
            //     type: 'text',
            //     placeholder: '请输入出库单号',
            //     label: '出库单号',
            //     name: 'invOutOrdNo',
            //     width: '200',
            //     rules: [{
            //         required: true,
            //         message: '请输入出库单号!'
            //     }],
            //     isDisabled: true
            // },
            {
                type: 'text',
                placeholder: '请输入领用部门',
                label: '领用部门',
                name: 'dept',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入领用部门!'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入用途',
                label: '用途',
                name: 'instru',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入用途!'
                }]
            },
            {
                type: 'text',
                placeholder: '请输入领用人姓名',
                label: '领用人姓名',
                name: 'useName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请输入领用人姓名!'
                }]
            },
            {
                type: 'date',
                placeholder: '请选择领用日期',
                label: '领用日期',
                name: 'useTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择领用日期!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择申请日期',
                label: '申请日期',
                name: 'reqTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择申请日期!'
                }]
            }, {
                type: 'date',
                placeholder: '请选择出库日期',
                label: '出库日期',
                name: 'invOutTime',
                width: '200',
                rules: [{
                    required: true,
                    message: '请选择出库日期!'
                }]
            }, {
                type: 'text',
                placeholder: '请填写仓库管理人',
                label: '仓库管理人',
                name: 'invName',
                width: '200',
                rules: [{
                    required: true,
                    message: '请填写仓库管理人!'
                }]
            }
        ],
        typeComponent: [{
            component: printBtn,
        }],
        addComponent: [{
                component: addmaterielBtn,
            },
            {
                component: submitBtn,
                params: {
                    title: '出库单'
                }
            }
        ]

    },
    adjustInventory: {
        key: 'adjustInventory',
        tab: '盘盈盘亏',
        prevKey: 'inventoryManager',
        getUrl: 'inventory/getSelectInvList',
        isCancel: true,
        submitUrl: 'inventory/generateEarLos',
        submitoUrl: '/erp/inventoryManager/adjust',
        // getDetilMsgUrl: 'inventory/getMatBatNoList',
        fixed: ['left', null, null, null, null, null, null, null, null, null, null, 'right'],
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '物料批号', '库存数量', '盘盈(+)/亏(-)', '单位', '情况说明', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'matBatNo', 'total', 'count', 'unit', 'remark', 'operate'],
        width: [70, 100, 100, 200, 100, 80, 200, 140, 180, 100, 350, 150],
        required: [{
            name: 'countTitle',
            title: '盘盈(+)/亏(-)'
        }],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'deleteRow'
            }],
            slotCols: [{
                key: 'matName',
                editType: 'select',
                editOpts: [{
                    value: 'AAA',
                    key: 1
                }, {
                    value: 'BBB',
                    key: 2
                }],
                editable: true,
                required: true,
                isHandleChange: true,
                isDefault: true,
                defaultUrl: 'common/getAllMatNameList',
                changeUrl: 'common/getMatDetail',
                numUrl: 'inventory/getMatBatNoList',
                placeholder: '请输入备注'
            }, {
                key: 'remark',
                editType: 'input',
                editable: true,
                required: true,
                placeholder: '请输入情况说明'
            }, {
                key: 'count',
                editType: 'count',
                editable: true,
                required: true,
                placeholder: '请输入盘盈(+)/亏(-)'
            }, {
                key: 'matBatNo',
                editType: 'select',
                editOpts: [],
                editable: true,
                required: true,
                placeholder: '请选择物料批号'
            }]
        },
        submitComponent: [{
            type: 'text',
            placeholder: '请输入盘点人',
            label: '盘点人',
            name: 'chkName',
            width: '200',
            rules: [{
                required: true,
                message: '请输入盘点人!'
            }]
        }, {
            type: 'date',
            placeholder: '请选择盘点日期',
            label: '盘点日期',
            name: 'chkTime',
            width: '200',
            rules: [{
                required: true,
                message: '请选择盘点日期!'
            }]
        }],
        typeComponent: [{
            component: addmaterielBtn,
        }, {
            component: submitBtn,
            title: ''
        }]
    },
    adjustDetail: {
        tab: '库存调整操作记录',
        key: 'adjustDetail',
        prevKey: 'inventoryManager',
        getUrl: 'logs/getLogList/1',
        theads: ['序号', '操作人姓名', '操作时间', '操作内容'],
        props: ['serial', 'name', 'createTime', 'content'],
        width: [70, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        }
    },
    instrumentlistDetail: {
        tab: '仪器主数据操作记录',
        key: 'instrumentlistDetail',
        prevKey: 'instrument',
        getUrl: 'logs/getLogList/2',
        theads: ['序号', '操作人姓名', '操作时间', '操作内容'],
        props: ['serial', 'name', 'createTime', 'content'],
        width: [70, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        }
    },
    instrumentplanDetail: {
        tab: '仪器周期检定计划操作记录',
        key: 'instrumentplanDetail',
        prevKey: 'instrument',
        getUrl: 'logs/getLogList/3',
        theads: ['序号', '操作人姓名', '操作时间', '操作内容'],
        props: ['serial', 'name', 'createTime', 'content'],
        width: [70, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        }
    },
    instrumentadjustDetail: {
        tab: '仪器调整操作记录',
        key: 'instrumentadjustDetail',
        prevKey: 'instrument',
        getUrl: 'logs/getLogList/2',
        theads: ['序号', '操作人姓名', '操作时间', '操作内容'],
        props: ['serial', 'name', 'createTime', 'content'],
        width: [70, 100, 100, 100],
        tableOperation: {
            rowSelection: false,
        }
    },
    reagentBatchAdd: {
        tab: '物料批量添加',
        key: 'reagentBatchAdd',
        type: 'batchAdd',
        prevKey: 'usable',
        batchAddUrl: 'baseinfo/generateMat',
        toUrl: '/erp/usable/reagent',
        theads: ['序号', '编号', '货号', '物料名称', '厂家', '规格', '单位', '安全库存', '单价（元）', '储存条件', '操作'],
        props: ['serial', 'matNo', 'goodsNo', 'matName', 'factory', 'spec', 'unit', 'total', 'price', 'stoCond', 'operate'],
        width: [70, 153, 180, 200, 150, 150, 150, 130, 130, 220, 150],
        fixed: [null, null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
            name: 'matNoTitle',
            title: '编号'
        },{
            name: 'goodsNoTitle',
            title: '货号'
        },{
            name: 'matNameTitle',
            title: '物料名称'
        },{
            name: 'factoryTitle',
            title: '厂家'
        },{
            name: 'specTitle',
            title: '规格'
        },{
            name: 'unitTitle',
            title: '单位'
        },{
            name: 'totalTitle',
            title: '安全库存'
        },{
            name: 'priceTitle',
            title: '单价（元）'
        },{
            name: 'stoCondTitle',
            title: '储存条件'
        }],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'deleteRow'
            }],
            slotCols: [{
                    key: 'matNo',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入编号'
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
                    placeholder: '请输入存储条件'
                },
            ]
        },
        typeComponent: [{
            component: batchSubtn,
        }],
    },
    instrumentBatchAdd: {
        tab: '仪器批量添加',
        key: 'instrumentBatchAdd',
        type: 'batchAdd',
        prevKey: 'usable',
        toUrl: '/erp/usable/instrument',
        batchAddUrl: 'baseinfo/generateInst',
        theads: ['序号', '分类', '仪器设备名称', '厂家', '规格型号', '单位', '校准周期（天）', '使用年限（年）', '单价(元)', '操作'],
        props: ['serial', 'catalog', 'instName', 'factory', 'spec', 'unit', 'calCycle', 'yearLimit', 'price', 'operate'],
        width: [70, 200, 220, 220, 211, 200, 120, 120, 120, 200],
        fixed: [null, null, null, null, null, null, null, null, null, 'right'],
        required: [{
            name: 'catalogTitle',
            title: '分类'
        },{
            name: 'instNameTitle',
            title: '仪器名称'
        },{
            name: 'factoryTitle',
            title: '厂家'
        },{
            name: 'specTitle',
            title: '规格型号'
        },{
            name: 'unitTitle',
            title: '单位'
        },{
            name: 'calCycleTitle',
            title: '校准周期'
        },{
            name: 'yearLimitTitle',
            title: '使用年限'
        },{
            name: 'priceTitle',
            title: '单价（元）'
        }],
        tableOperation: {
            rowSelection: false,
            operates: [{
                title: '编辑',
                editSubmitTitle: '确认',
                editCancelTitle: '取消',
                action: 'edit'
            }, {
                title: '删除',
                action: 'deleteRow'
            }],
            slotCols: [{
                    key: 'catalog',
                    editType: 'input',
                    editable: true,
                    required: true,
                    placeholder: '请输入分类'
                },
                {
                    key: 'instName',
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
                    // isHandleChange: true,
                    // isDefault: true,
                    // defaultUrl: 'inst/getAllInstBaseNameList',
                    // changeUrl: 'inst/getInstBaseDetail',
                    placeholder: '请选择仪器名称'
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
                    editType: 'inputNum',
                    editable: true,
                    required: true,
                    placeholder: '请输入周期'
                },
                {
                    key: 'yearLimit',
                    editType: 'inputNum',
                    editable: true,
                    required: true,
                    placeholder: '请输入年限'
                },
                {
                    key: 'price',
                    editType: 'inputAfter',
                    editable: true,
                    required: true,
                    placeholder: '请输入单价'
                },
            ]
        },
        typeComponent: [{
            component: batchSubtn,
        }],
    },
}