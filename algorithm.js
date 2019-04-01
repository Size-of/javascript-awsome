let arr = [6, 1, 4, 5, 3, 2, 10, 11, 9, 8, 7];


function swap (array, left, right) {
    let rightValue = array[right];
    array[right] = array[left];
    array[left] = rightValue
}


function bubble (arr) { 
    let result = [...arr];
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (result[i] > result[j]) swap(result, i, j);
        }
    }; 
    return result;
}

function insert (arr) {
    let res = [...arr];
    for (let i = 1; i < res.length; i++) {
		for (let j = i - 1; j >= 0; j--) {
            if (res[j + 1] < res[j]) swap(res, j, j + 1);
        }
    }
    return res;
}

function mergeSort (arr, left, right) {
    if (left === right) return;
    let mid = parseInt(left + ((right - left) >> 1));

    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    let help = [];
    let i = 0;
    let p1 = left;
    let p2 = mid + 1;

    while (p1 <= mid && p2 <= right) {
        help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <=  mid) {
        help[i++] = arr[p1++];
    }
    while(p2 <= right) {
        help[i++] = arr[p2++]
    }
    for (let i = 0; i < help.length; i++) {
        arr[left + i] = help[i];
    }
    return arr;
}

function quicksort (arr, left, right) {
    if (left < right) {
		let mid = parseInt(((right - left) >> 1) + left);
        swap(arr, mid, right);

        let indexs = part(arr, left, right);
        quicksort(arr, left, indexs[0]);
        quicksort(arr, indexs[1] + 1, right);
    }
}

function part (array, left, right) {
    let less = left - 1;
    let more = right;

    while (left < more) {
        if (array[left] < array[right]){
            ++less;
            ++left;
        } else if (array[left] > array[right]) {
            swap(arr, --more, left);
        } else {
            left++;
        }
    }
    swap(array, right, more);
    return [less, more];
}
