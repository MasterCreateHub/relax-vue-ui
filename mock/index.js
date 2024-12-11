import Mock from 'mockjs';
import fetchMock from 'fetch-mock';

// const Random = Mock.Random;

// 设备总览
function getAudienceData() {
    const data = Mock.mock({
        msg: '操作成功',
        code: 200,
        data: {
            number: '@integer(100, 10000)'
        },
    });
    return data;
}

fetchMock.mockGlobal()

fetchMock.get('/audience/data', getAudienceData);
