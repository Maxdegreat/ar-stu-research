

export function getOutputOnPoints11_16(poseMap) {
    // get the keypoints 11 - 16.
    // return a Map <int, int> where key is keypoint and value is attentive points. value is +1 for every point from 11-16 that is visible.
    var hash = {};
    for (var i = 0; i < poseMap.length; i++) {
        if ( i > 10 ) {
            var value = poseMap["keypoints"][i]["score"] < 0.8 ? 1 : 0;
            hash[i] = value;
        }
    }
    return hash;
}