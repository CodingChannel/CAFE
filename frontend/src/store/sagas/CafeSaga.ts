import { AppAction } from "./../actions/index";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCafesSuccess, fetchCafesFailure, addCafeSuccess, addCafeFailure, updateCafeSuccess, updateCafeFailure, deleteCafeSuccess, deleteCafeFailure, fetchCafeFailure, fetchCafeSuccess, setCafeToBeEdited, fetchLocationsFailure, fetchLocationsSuccess, fetchCafes } from "../actions/CafeAction";
import { getCafes, createCafe, updateCafe, deleteCafe, getCafeById, getLocations } from "../services/CafeService";
import { CafeDto } from "../../models/dto/CafeDto";

function* fetchCafesSaga(action: AppAction) {
  const selectedLocation = action.payload ? action.payload.toString() : "";
  try {
    const cafes: CafeDto[] = yield call(getCafes, selectedLocation);
    yield put(fetchCafesSuccess(cafes));
  } catch (error: any) {
    yield put(fetchCafesFailure(error.message));
  }
}
function* fetchLocationsSaga() {
  try {
    const locations: string[] = yield call(getLocations);
    yield put(fetchLocationsSuccess(locations));
  } catch (error: any) {
    yield put(fetchLocationsFailure(error.message));
  }
}

function* fetchCafeSaga(action: AppAction) {
  const id = action.payload ? action.payload.toString() : "";
  try {
    const cafe: CafeDto = yield call(getCafeById, id);
    yield put(setCafeToBeEdited(cafe));
    yield put(fetchCafeSuccess(true));
  } catch (error: any) {
    yield put(fetchCafeFailure(error.message));
  }
}
function* addCafeSaga(action: any) {
  try {
    yield call(createCafe, action.payload);
    yield put(addCafeSuccess(true));
    yield put(fetchCafes());
  } catch (error: any) {
    yield put(addCafeFailure(error.message));
  }
}

function* updateCafeSaga(action: any) {
  try {
    yield call(updateCafe, action.payload);
    yield put(updateCafeSuccess(true));
    yield put(fetchCafes());
  } catch (error: any) {
    yield put(updateCafeFailure(error.message));
  }
}

function* deleteCafeSaga(action: any) {
  try {
    yield call(deleteCafe, action.payload);
    yield put(deleteCafeSuccess(action.payload));
    yield put(fetchCafes());
  } catch (error: any) {
    yield put(deleteCafeFailure(error.message));
  }
}

function* cafeSaga() {
  yield takeLatest("FETCH_CAFES_REQUEST", fetchCafesSaga);
  yield takeLatest("FETCH_LOCATIONS_REQUEST", fetchLocationsSaga);
  yield takeLatest("FETCH_CAFE_REQUEST", fetchCafeSaga);
  yield takeLatest("ADD_CAFE_REQUEST", addCafeSaga);
  yield takeLatest("UPDATE_CAFE_REQUEST", updateCafeSaga);
  yield takeLatest("DELETE_CAFE_REQUEST", deleteCafeSaga);
}

export default cafeSaga;
