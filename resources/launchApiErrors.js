export function dealingWithLaunchWithInvalidId(id) {
    return {
        "errorCode": 4041,
        "message": `Launch '${id}' not found. Did you use correct Launch ID?`
      }
}