export default {
    applicationDetailPrint: {
        key: 'application',
        title: '请购单',
        getUrl: 'materiel/detail',
        headDesc: {
            applicationNum: '表号',
            createdDate: '生效日期',
            reqTime: '请购日期'
        },
        tableDesc: {
            dept: '请购部门',
            reqName: '申请人',
            group: '组别'
        },
        thead: ['序号', '名称', '货号', '厂家', '规格型号', '单位', '数量', '用途', '需求时间', '备注'],
        props: ['serial', 'matName', 'matNo', 'factory', 'spec', 'unit', 'total', 'instru', 'demTime', 'remark'],
    },
    inDetailPrint: {
        key: 'in',
        title: '入库单',
        getUrl: 'inventory/getInOrderDetail',
        headDesc: {
            inNum: '表号',
            createdDate: '生效日期',
        },
        tableDesc: {
            orderNo: '订单编号',
            supplier: '供应商',
            arrTime: '到货日期',
        },
        thead: ['序号', '物料编码', '物料名称', '规格型号', '批号', '单位', '数量', '验收情况', '备注'],
        props: ['serial', 'matNo', 'matName', 'spec', 'matBatNo', 'unit', 'total', 'acptStatus', 'remark'],
        width: [80, 150, 300, 100, 100, 100, 100, 100, 250],
        inFoot: {
            acptName: '验收人',
            acptTime: '验收日期',
            invName: '入库人',
            invInTime: '入库日期',
            usePartSign: '使用部门签字',
            usePartDate: '日期',
            purchaseSign: '采购部签字',
            purchaseDate: '日期'
        }
    },
    outDetailPrint: {
        key: 'out',
        title: '出库单',
        getUrl: 'inventory/getOutOrderDetail',
        headDesc: {
            outNum: '表号',
            createdDate: '生效日期',
        },
        tableDesc: {
            invOutOrdNo: '出库单号',
            dept: '领用部门',
            instru: '用途',
        },
        thead: ['序号', '物料编号', '物料名称', '规格型号', '批号', '单位', '数量', '备注'],
        props: ['serial', 'matNo', 'matName', 'spec', 'matBatNo', 'unit', 'total', 'remark'],
        outFoot: {
            useName: '领料人',
            check: '审批',
            invName: '仓管',
            useTime: '领料日期',
            checkTime: '审批日期',
            invOutTime: '出库日期',
        }
    }
}