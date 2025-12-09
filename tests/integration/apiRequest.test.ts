import { apiService } from '../../src/services/apiService';
import { createEmptyRequest } from '../../src/utils/helpers';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Request Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send GET request successfully', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      data: { message: 'Success' },
    };

    mockedAxios.mockResolvedValue(mockResponse);

    const request = createEmptyRequest();
    request.url = 'https://api.example.com/users';
    request.method = 'GET';

    const response = await apiService.sendRequest(request);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'get',
        url: 'https://api.example.com/users',
      })
    );
  });

  it('should send POST request with body', async () => {
    const mockResponse = {
      status: 201,
      statusText: 'Created',
      headers: {},
      data: { id: 1, name: 'John' },
    };

    mockedAxios.mockResolvedValue(mockResponse);

    const request = createEmptyRequest();
    request.url = 'https://api.example.com/users';
    request.method = 'POST';
    request.body = {
      type: 'json',
      json: { name: 'John' },
    };

    const response = await apiService.sendRequest(request);

    expect(response.status).toBe(201);
    expect(response.data.id).toBe(1);
  });

  it('should handle request errors', async () => {
    mockedAxios.mockRejectedValue({
      message: 'Network Error',
      code: 'ERR_NETWORK',
    });

    const request = createEmptyRequest();
    request.url = 'https://api.example.com/users';

    await expect(apiService.sendRequest(request)).rejects.toMatchObject({
      message: expect.stringContaining('Network Error'),
    });
  });

  it('should add authorization headers', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      data: {},
    };

    mockedAxios.mockResolvedValue(mockResponse);

    const request = createEmptyRequest();
    request.url = 'https://api.example.com/users';
    request.auth = {
      type: 'bearer',
      bearer: 'test-token',
    };

    await apiService.sendRequest(request);

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      })
    );
  });
});

